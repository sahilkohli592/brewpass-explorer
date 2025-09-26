import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OfflineAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
  retryCount: number;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  // Load pending actions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('offlinePendingActions');
    if (stored) {
      try {
        setPendingActions(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load pending actions:', error);
      }
    }
  }, []);

  // Save pending actions to localStorage
  useEffect(() => {
    localStorage.setItem('offlinePendingActions', JSON.stringify(pendingActions));
  }, [pendingActions]);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: 'Back online',
        description: 'Your connection has been restored. Syncing pending changes...',
      });
      syncPendingActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: 'You\'re offline',
        description: 'Changes will be saved locally and synced when you\'re back online.',
        variant: 'destructive',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingActions]);

  // Add action to pending queue
  const queueAction = (type: string, payload: any) => {
    const action: OfflineAction = {
      id: crypto.randomUUID(),
      type,
      payload,
      timestamp: Date.now(),
      retryCount: 0,
    };

    setPendingActions(prev => [...prev, action]);

    if (isOnline) {
      syncPendingActions();
    }
  };

  // Sync pending actions when back online
  const syncPendingActions = async () => {
    if (!isOnline || isSyncing || pendingActions.length === 0) return;

    setIsSyncing(true);

    const actionsToProcess = [...pendingActions];
    const failedActions: OfflineAction[] = [];

    for (const action of actionsToProcess) {
      try {
        // Process different types of actions
        await processAction(action);
        
        // Remove successful action from pending list
        setPendingActions(prev => 
          prev.filter(a => a.id !== action.id)
        );
      } catch (error) {
        console.error('Failed to sync action:', error);
        
        // Retry logic
        const updatedAction = { 
          ...action, 
          retryCount: action.retryCount + 1 
        };
        
        if (updatedAction.retryCount < 3) {
          failedActions.push(updatedAction);
        } else {
          // Give up after 3 retries
          toast({
            title: 'Sync failed',
            description: `Failed to sync ${action.type} after 3 attempts.`,
            variant: 'destructive',
          });
        }
      }
    }

    // Update pending actions with failed ones
    setPendingActions(failedActions);
    setIsSyncing(false);

    if (failedActions.length === 0 && actionsToProcess.length > 0) {
      toast({
        title: 'Sync complete',
        description: 'All offline changes have been synchronized.',
      });
    }
  };

  // Process individual actions
  const processAction = async (action: OfflineAction): Promise<void> => {
    switch (action.type) {
      case 'CREATE_REVIEW':
        // Handle review creation
        // await supabase.from('reviews').insert(action.payload);
        console.log('Syncing review:', action.payload);
        break;
      
      case 'UPDATE_PROFILE':
        // Handle profile updates
        // await supabase.from('profiles').update(action.payload.data).eq('id', action.payload.id);
        console.log('Syncing profile update:', action.payload);
        break;
      
      case 'FAVORITE_CAFE':
        // Handle cafe favoriting
        console.log('Syncing favorite cafe:', action.payload);
        break;
      
      default:
        console.warn('Unknown action type:', action.type);
        break;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  // Clear all pending actions (use with caution)
  const clearPendingActions = () => {
    setPendingActions([]);
    localStorage.removeItem('offlinePendingActions');
  };

  return {
    isOnline,
    pendingActions: pendingActions.length,
    isSyncing,
    queueAction,
    syncPendingActions,
    clearPendingActions,
  };
};
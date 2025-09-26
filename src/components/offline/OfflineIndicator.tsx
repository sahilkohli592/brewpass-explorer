import React from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { cn } from '@/lib/utils';

const OfflineIndicator: React.FC = () => {
  const { isOnline, pendingActions, isSyncing, syncPendingActions } = useOfflineSync();

  if (isOnline && pendingActions === 0) {
    return null; // Don't show anything when online and no pending actions
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
      <Alert className={cn(
        "shadow-lg backdrop-blur-sm border-2 transition-all duration-300",
        isOnline 
          ? "bg-green-50/90 border-green-200 dark:bg-green-950/90 dark:border-green-800"
          : "bg-red-50/90 border-red-200 dark:bg-red-950/90 dark:border-red-800"
      )}>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-600" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-600" />
          )}
          
          <AlertDescription className="flex-1 text-sm">
            {isOnline ? (
              <div className="flex items-center justify-between">
                <span className="text-green-800 dark:text-green-200">
                  Back online
                </span>
                {pendingActions > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {pendingActions} pending
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={syncPendingActions}
                      disabled={isSyncing}
                      className="h-6 px-2 text-xs"
                    >
                      {isSyncing ? (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Sync now
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-red-800 dark:text-red-200">
                You're offline. Changes will sync when connection is restored.
              </span>
            )}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default OfflineIndicator;
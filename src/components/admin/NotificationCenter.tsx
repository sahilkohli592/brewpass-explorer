import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Send, Users, MessageSquare, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'offer' | 'announcement' | 'reminder' | 'promotion';
  targetAudience: 'all' | 'loyal_customers' | 'new_customers' | 'inactive_customers';
  scheduledFor: string;
  sent: boolean;
  sentAt?: string;
  recipients: number;
}

const NotificationCenter = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Weekend Special',
      message: 'Enjoy 15% off on all beverages this weekend! Visit us now.',
      type: 'offer',
      targetAudience: 'all',
      scheduledFor: '2024-01-15T10:00',
      sent: true,
      sentAt: '2024-01-15T10:00:00Z',
      recipients: 250,
    },
  ]);

  const [newNotification, setNewNotification] = useState<Omit<Notification, 'id' | 'sent' | 'sentAt' | 'recipients'>>({
    title: '',
    message: '',
    type: 'offer',
    targetAudience: 'all',
    scheduledFor: '',
  });

  const handleSendNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast({
        title: "Invalid Input",
        description: "Please fill in title and message.",
        variant: "destructive",
      });
      return;
    }

    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      sent: !newNotification.scheduledFor || new Date(newNotification.scheduledFor) <= new Date(),
      sentAt: !newNotification.scheduledFor || new Date(newNotification.scheduledFor) <= new Date() 
        ? new Date().toISOString() 
        : undefined,
      recipients: getEstimatedRecipients(newNotification.targetAudience),
    };

    setNotifications([notification, ...notifications]);
    setNewNotification({
      title: '',
      message: '',
      type: 'offer',
      targetAudience: 'all',
      scheduledFor: '',
    });

    toast({
      title: notification.sent ? "Notification Sent" : "Notification Scheduled",
      description: notification.sent 
        ? `Message sent to ${notification.recipients} customers`
        : `Message scheduled for ${new Date(notification.scheduledFor).toLocaleString()}`,
    });
  };

  const getEstimatedRecipients = (audience: string) => {
    switch (audience) {
      case 'all': return 500;
      case 'loyal_customers': return 150;
      case 'new_customers': return 80;
      case 'inactive_customers': return 200;
      default: return 0;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'offer': return 'bg-green-100 text-green-800';
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      case 'promotion': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'all': return 'All Customers';
      case 'loyal_customers': return 'Loyal Customers';
      case 'new_customers': return 'New Customers';
      case 'inactive_customers': return 'Inactive Customers';
      default: return 'All Customers';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Send New Notification */}
          <div className="border-2 border-dashed border-muted rounded-lg p-4">
            <h3 className="font-semibold mb-4">Send New Notification</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="notificationTitle">Title</Label>
                <Input
                  id="notificationTitle"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  placeholder="e.g., Weekend Special Offer"
                />
              </div>

              <div>
                <Label htmlFor="notificationMessage">Message</Label>
                <Textarea
                  id="notificationMessage"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  placeholder="Write your message here..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="notificationType">Type</Label>
                  <select
                    id="notificationType"
                    className="w-full p-2 border rounded-md"
                    value={newNotification.type}
                    onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as any })}
                  >
                    <option value="offer">Offer/Discount</option>
                    <option value="announcement">Announcement</option>
                    <option value="reminder">Reminder</option>
                    <option value="promotion">Promotion</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <select
                    id="targetAudience"
                    className="w-full p-2 border rounded-md"
                    value={newNotification.targetAudience}
                    onChange={(e) => setNewNotification({ ...newNotification, targetAudience: e.target.value as any })}
                  >
                    <option value="all">All Customers (~500)</option>
                    <option value="loyal_customers">Loyal Customers (~150)</option>
                    <option value="new_customers">New Customers (~80)</option>
                    <option value="inactive_customers">Inactive Customers (~200)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="scheduledFor">Schedule For (Optional)</Label>
                <Input
                  id="scheduledFor"
                  type="datetime-local"
                  value={newNotification.scheduledFor}
                  onChange={(e) => setNewNotification({ ...newNotification, scheduledFor: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to send immediately
                </p>
              </div>
            </div>

            <Button onClick={handleSendNotification} className="mt-4">
              <Send className="h-4 w-4 mr-2" />
              {newNotification.scheduledFor && new Date(newNotification.scheduledFor) > new Date() 
                ? 'Schedule Notification' 
                : 'Send Now'}
            </Button>
          </div>

          {/* Notification History */}
          <div>
            <h3 className="font-semibold mb-4">Notification History ({notifications.length})</h3>
            {notifications.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No notifications sent yet.</p>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{notification.title}</h4>
                            <Badge className={getTypeColor(notification.type)}>
                              {notification.type}
                            </Badge>
                            <Badge variant={notification.sent ? 'default' : 'secondary'}>
                              {notification.sent ? 'Sent' : 'Scheduled'}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{getAudienceLabel(notification.targetAudience)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{notification.recipients} recipients</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {notification.sent 
                                  ? `Sent: ${new Date(notification.sentAt!).toLocaleString()}`
                                  : `Scheduled: ${new Date(notification.scheduledFor).toLocaleString()}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
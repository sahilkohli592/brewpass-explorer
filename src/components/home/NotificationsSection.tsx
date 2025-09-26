import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Gift, Percent, Clock, X } from 'lucide-react';

const NotificationsSection = () => {
  const notifications = [
    {
      id: 1,
      type: 'offer',
      title: 'Limited Time Offer!',
      message: 'Get 40% off on your next coffee order. Valid until midnight!',
      time: '2h ago',
      read: false,
      icon: <Percent className="w-4 h-4" />
    },
    {
      id: 2,
      type: 'reward',
      title: 'Congratulations!',
      message: 'You earned 50 reward points from your last order at Brew & Beans.',
      time: '5h ago',
      read: false,
      icon: <Gift className="w-4 h-4" />
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Voucher Expiring Soon',
      message: 'Your free coffee voucher expires in 3 days. Use it before it\'s gone!',
      time: '1d ago',
      read: true,
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 4,
      type: 'engagement',
      title: 'Come Back for More!',
      message: 'We miss you! Here\'s a special 25% discount to welcome you back.',
      time: '2d ago',
      read: true,
      icon: <Bell className="w-4 h-4" />
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'offer':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'reward':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'reminder':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'engagement':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} new
                  </Badge>
                )}
              </CardTitle>
              <Button variant="ghost" size="sm">
                Mark all as read
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    notification.read ? 'bg-muted/20' : 'bg-background border-primary/20'
                  } hover:border-primary/40`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg border ${getNotificationColor(notification.type)}`}>
                      {notification.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-semibold ${notification.read ? 'text-muted-foreground' : ''}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${
                        notification.read ? 'text-muted-foreground' : 'text-foreground/80'
                      }`}>
                        {notification.message}
                      </p>
                      
                      {!notification.read && notification.type === 'offer' && (
                        <div className="mt-3">
                          <Button size="sm" variant="outline">
                            View Offer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {notifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up! We'll notify you of new offers and updates.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsSection;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  time: string;
  partySize: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  specialRequests: string;
  tableNumber?: string;
  createdAt: string;
}

const ReservationManager = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      customerName: 'John Doe',
      customerPhone: '+91 98765 43210',
      customerEmail: 'john@example.com',
      date: '2024-01-20',
      time: '19:00',
      partySize: 4,
      status: 'pending',
      specialRequests: 'Window seat preferred',
      createdAt: '2024-01-18T10:30:00Z',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerPhone: '+91 98765 43211',
      customerEmail: 'jane@example.com',
      date: '2024-01-19',
      time: '18:30',
      partySize: 2,
      status: 'confirmed',
      specialRequests: '',
      tableNumber: 'T5',
      createdAt: '2024-01-17T14:20:00Z',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');

  const handleStatusChange = (reservationId: string, newStatus: Reservation['status']) => {
    setReservations(reservations.map(reservation =>
      reservation.id === reservationId
        ? { ...reservation, status: newStatus }
        : reservation
    ));

    const reservation = reservations.find(r => r.id === reservationId);
    toast({
      title: "Reservation Updated",
      description: `${reservation?.customerName}'s reservation has been ${newStatus}.`,
    });
  };

  const handleTableAssignment = (reservationId: string, tableNumber: string) => {
    setReservations(reservations.map(reservation =>
      reservation.id === reservationId
        ? { ...reservation, tableNumber }
        : reservation
    ));

    toast({
      title: "Table Assigned",
      description: `Table ${tableNumber} has been assigned to this reservation.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const statusMatch = filterStatus === 'all' || reservation.status === filterStatus;
    const dateMatch = !filterDate || reservation.date === filterDate;
    return statusMatch && dateMatch;
  });

  const getReservationStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayReservations = reservations.filter(r => r.date === today);
    
    return {
      total: reservations.length,
      today: todayReservations.length,
      pending: reservations.filter(r => r.status === 'pending').length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
    };
  };

  const stats = getReservationStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Reservations</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Today's Bookings</p>
                <p className="text-2xl font-bold">{stats.today}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{stats.confirmed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Reservation Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="statusFilter">Filter by Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="dateFilter">Filter by Date</Label>
              <Input
                id="dateFilter"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>

          {/* Reservations List */}
          <div>
            <h3 className="font-semibold mb-4">
              Reservations ({filteredReservations.length})
            </h3>
            
            {filteredReservations.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No reservations found for the selected filters.
              </p>
            ) : (
              <div className="space-y-4">
                {filteredReservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{reservation.customerName}</h4>
                            <Badge className={getStatusColor(reservation.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(reservation.status)}
                                {reservation.status}
                              </span>
                            </Badge>
                            {reservation.tableNumber && (
                              <Badge variant="outline">
                                Table {reservation.tableNumber}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{reservation.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{reservation.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{reservation.partySize} guests</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              <span>{reservation.customerPhone}</span>
                            </div>
                            <div className="md:col-span-2">
                              <span>{reservation.customerEmail}</span>
                            </div>
                          </div>

                          {reservation.specialRequests && (
                            <div className="mt-2 p-2 bg-muted rounded text-sm">
                              <strong>Special Requests:</strong> {reservation.specialRequests}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          {reservation.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                              >
                                Confirm
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          
                          {reservation.status === 'confirmed' && (
                            <>
                              <div className="flex gap-1">
                                <Input
                                  placeholder="Table #"
                                  className="w-20 h-8"
                                  onBlur={(e) => {
                                    if (e.target.value) {
                                      handleTableAssignment(reservation.id, e.target.value);
                                    }
                                  }}
                                />
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(reservation.id, 'completed')}
                              >
                                Complete
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(reservation.id, 'no_show')}
                              >
                                No Show
                              </Button>
                            </>
                          )}
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

export default ReservationManager;
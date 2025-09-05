import React, { useState, useEffect } from 'react';
import { Crown, TrendingUp, Users, Coffee, DollarSign, MapPin, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

const BusinessDashboard = () => {
  const [metrics, setMetrics] = useState<any>({});
  const [cafes, setCafes] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch latest business metrics
      const { data: metricsData } = await supabase
        .from('business_metrics')
        .select('*')
        .order('metric_date', { ascending: false })
        .limit(7);

      // Fetch cafes data
      const { data: cafesData } = await supabase
        .from('cafes')
        .select('*')
        .order('partner_since', { ascending: false });

      // Fetch customers data
      const { data: customersData } = await supabase
        .from('customers')
        .select('*')
        .order('date_joined', { ascending: false });

      if (metricsData) {
        const latest = metricsData[0] || { active_cafes: 0 };
        const weeklyRevenue = metricsData.reduce((sum, day) => sum + Number(day.total_revenue || 0), 0);
        const weeklyVisits = metricsData.reduce((sum, day) => sum + Number(day.total_visits || 0), 0);
        
        setMetrics({
          totalRevenue: weeklyRevenue,
          totalVisits: weeklyVisits,
          totalRedemptions: metricsData.reduce((sum, day) => sum + Number(day.total_redemptions || 0), 0),
          activeCafes: latest.active_cafes || 0,
          newCustomers: metricsData.reduce((sum, day) => sum + Number(day.new_customers || 0), 0),
          chartData: metricsData.reverse()
        });
      }

      setCafes(cafesData || []);
      setCustomers(customersData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
    visits: {
      label: "Visits", 
      color: "hsl(var(--secondary))",
    },
  } satisfies ChartConfig;

  const cityDistribution = cafes.reduce((acc, cafe) => {
    acc[cafe.city] = (acc[cafe.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cityChartData = Object.entries(cityDistribution).map(([city, count]) => ({
    city,
    count,
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  if (loading) {
    return (
      <div className="container py-24">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Crown className="h-8 w-8 animate-pulse mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-24">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Krown Business Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of your loyalty program network
            </p>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalRevenue?.toLocaleString() || '0'}</div>
              <p className="text-xs text-muted-foreground">Weekly revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalVisits?.toLocaleString() || '0'}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Redemptions</CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalRedemptions?.toLocaleString() || '0'}</div>
              <p className="text-xs text-muted-foreground">Weekly redemptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cafés</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeCafes || '0'}</div>
              <p className="text-xs text-muted-foreground">Partner locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.newCustomers || '0'}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="cafes">Café Network</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Revenue & Visits Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Performance</CardTitle>
                  <CardDescription>Revenue and visit trends over the past 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={metrics.chartData || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="metric_date" 
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value, name) => [
                            name === 'total_revenue' ? `$${value}` : value,
                            name === 'total_revenue' ? 'Revenue' : 'Visits'
                          ]}
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="total_revenue" 
                          stroke="var(--color-revenue)" 
                          strokeWidth={2}
                          dot={{ fill: "var(--color-revenue)" }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="total_visits" 
                          stroke="var(--color-visits)" 
                          strokeWidth={2}
                          dot={{ fill: "var(--color-visits)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Café Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Café Distribution by City</CardTitle>
                  <CardDescription>Geographic spread of partner locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cityChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ city, count }) => `${city}: ${count}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {cityChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Metrics Breakdown</CardTitle>
                  <CardDescription>Detailed performance metrics by day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics.chartData || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="metric_date"
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <Bar dataKey="total_visits" fill="var(--color-visits)" name="Visits" />
                        <Bar dataKey="total_redemptions" fill="var(--color-revenue)" name="Redemptions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cafes" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cafes.map((cafe) => (
                <Card key={cafe.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{cafe.name}</CardTitle>
                    <CardDescription>{cafe.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">City:</span>
                        <span className="text-sm font-medium">{cafe.city}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Partner Since:</span>
                        <span className="text-sm font-medium">
                          {new Date(cafe.partner_since).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <span className={`text-sm font-medium capitalize ${
                          cafe.status === 'active' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {cafe.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {customers.slice(0, 12).map((customer) => (
                <Card key={customer.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {customer.first_name} {customer.last_name}
                    </CardTitle>
                    <CardDescription>{customer.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Visits:</span>
                        <span className="text-sm font-medium">{customer.total_visits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Redemptions:</span>
                        <span className="text-sm font-medium">{customer.total_redemptions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Loyalty Points:</span>
                        <span className="text-sm font-medium">{customer.loyalty_points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Member Since:</span>
                        <span className="text-sm font-medium">
                          {new Date(customer.date_joined).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
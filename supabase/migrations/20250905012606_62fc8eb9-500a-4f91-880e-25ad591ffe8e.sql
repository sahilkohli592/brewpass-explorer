-- Create business metrics tables for Krown overall business dashboard

-- Create cafes table to track partner cafés
CREATE TABLE public.cafes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  partner_since TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table to track app users
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_joined TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  total_visits INTEGER DEFAULT 0,
  total_redemptions INTEGER DEFAULT 0,
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create visits table to track customer café visits
CREATE TABLE public.visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  cafe_id UUID NOT NULL REFERENCES public.cafes(id) ON DELETE CASCADE,
  visit_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  points_earned INTEGER DEFAULT 0,
  amount_spent DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create redemptions table to track loyalty redemptions
CREATE TABLE public.redemptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  cafe_id UUID NOT NULL REFERENCES public.cafes(id) ON DELETE CASCADE,
  visit_id UUID REFERENCES public.visits(id) ON DELETE SET NULL,
  item_redeemed TEXT NOT NULL,
  points_used INTEGER NOT NULL,
  redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create business_metrics table for daily aggregated metrics
CREATE TABLE public.business_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_date DATE NOT NULL,
  total_visits INTEGER DEFAULT 0,
  total_redemptions INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  new_customers INTEGER DEFAULT 0,
  active_cafes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(metric_date)
);

-- Enable Row Level Security
ALTER TABLE public.cafes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (for now, allowing all authenticated users)
-- In production, you'd want role-based access control

CREATE POLICY "Allow authenticated users to read cafes" 
ON public.cafes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read customers" 
ON public.customers FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read visits" 
ON public.visits FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read redemptions" 
ON public.redemptions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read business metrics" 
ON public.business_metrics FOR SELECT TO authenticated USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_cafes_updated_at
BEFORE UPDATE ON public.cafes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for demonstration
INSERT INTO public.cafes (name, address, city, partner_since) VALUES
('Coffee Haven', '123 Bean Street', 'Downtown', '2023-01-15'::timestamp),
('Brew Masters', '456 Roast Avenue', 'Midtown', '2023-02-20'::timestamp),
('The Daily Grind', '789 Espresso Lane', 'Uptown', '2023-03-10'::timestamp),
('Bean There', '321 Latte Road', 'Downtown', '2023-04-05'::timestamp),
('Caffeine Corner', '654 Mocha Street', 'Westside', '2023-05-12'::timestamp);

INSERT INTO public.customers (email, first_name, last_name, total_visits, total_redemptions, loyalty_points, date_joined) VALUES
('john.doe@email.com', 'John', 'Doe', 15, 8, 120, '2023-01-20'::timestamp),
('jane.smith@email.com', 'Jane', 'Smith', 22, 12, 180, '2023-02-10'::timestamp),
('mike.wilson@email.com', 'Mike', 'Wilson', 8, 4, 60, '2023-03-15'::timestamp),
('sarah.johnson@email.com', 'Sarah', 'Johnson', 31, 18, 250, '2023-01-25'::timestamp),
('alex.brown@email.com', 'Alex', 'Brown', 12, 7, 95, '2023-04-02'::timestamp);

INSERT INTO public.business_metrics (metric_date, total_visits, total_redemptions, total_revenue, new_customers, active_cafes) VALUES
('2024-01-01', 45, 28, 1250.00, 12, 5),
('2024-01-02', 52, 31, 1420.00, 8, 5),
('2024-01-03', 48, 29, 1380.00, 15, 5),
('2024-01-04', 61, 35, 1650.00, 10, 5),
('2024-01-05', 55, 33, 1500.00, 18, 5);
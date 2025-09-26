
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import OfflineIndicator from '@/components/offline/OfflineIndicator';
import Index from "./pages/Index";
import CafesList from "./pages/CafesList";
import LoyaltyCard from "./pages/LoyaltyCard";
import ReferralProgram from "./pages/ReferralProgram";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import UserProfile from "./components/UserProfile";
import DineOut from "./pages/DineOut";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <OfflineIndicator />
            <main className="container mx-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cafes" element={<CafesList />} />
                <Route path="/loyalty" element={<LoyaltyCard />} />
                <Route path="/referral" element={<ReferralProgram />} />
                <Route path="/dine-out" element={<DineOut />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/business" element={<BusinessDashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

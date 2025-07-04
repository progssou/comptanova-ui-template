
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

// Layout
import { DashboardLayout } from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes with dashboard layout */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          
          <Route path="/utilisateurs" element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          } />
          
          <Route path="/parametres" element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } />
          
          {/* Coming soon pages */}
          <Route path="/journaux" element={
            <DashboardLayout>
              <ComingSoon 
                title="Journaux comptables" 
                description="Gérez vos écritures comptables et journaux"
              />
            </DashboardLayout>
          } />
          
          <Route path="/comptes" element={
            <DashboardLayout>
              <ComingSoon 
                title="Plan comptable" 
                description="Consultez et gérez votre plan de comptes"
              />
            </DashboardLayout>
          } />
          
          <Route path="/pieces" element={
            <DashboardLayout>
              <ComingSoon 
                title="Pièces justificatives" 
                description="Organisez vos factures et documents comptables"
              />
            </DashboardLayout>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

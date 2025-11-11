import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Donation from "./pages/Donation";
import Volunteer from "./pages/Volunteer";
import PaymentInfo from "./pages/PaymentInfo";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash, location.search]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/payment-info" element={<PaymentInfo />} />
        <Route path="/admin" element={<Admin />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

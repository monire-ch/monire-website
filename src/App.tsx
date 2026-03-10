import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import CaseStudyExpenseReceipt from "./pages/CaseStudyExpenseReceipt";
import CaseStudySnipSquad from "./pages/CaseStudySnipSquad";
import CaseStudySystemically from "./pages/CaseStudySystemically";
import CaseStudyTowarowa from "./pages/CaseStudyTowarowa";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies/expense-receipt-automation" element={<CaseStudyExpenseReceipt />} />
          <Route path="/case-studies/snip-squad" element={<CaseStudySnipSquad />} />
          <Route path="/case-studies/systemically" element={<CaseStudySystemically />} />
          <Route path="/case-studies/towarowa" element={<CaseStudyTowarowa />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

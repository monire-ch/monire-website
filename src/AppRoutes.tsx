import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import CaseStudyExpenseReceipt from "./pages/CaseStudyExpenseReceipt";
import CaseStudySnipSquad from "./pages/CaseStudySnipSquad";
import CaseStudySystemically from "./pages/CaseStudySystemically";
import CaseStudyTowarowa from "./pages/CaseStudyTowarowa";
import NotFound from "./pages/NotFound";

const AppRoutes = () => (
  <>
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AppRoutes;

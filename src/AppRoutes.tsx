import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import CaseStudyPage from "./pages/CaseStudyPage";
import Insights from "./pages/Insights";
import InsightPost from "./pages/InsightPost";
import NotFound from "./pages/NotFound";

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/insights/:slug" element={<InsightPost />} />
      <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AppRoutes;

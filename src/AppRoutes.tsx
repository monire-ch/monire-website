import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import CaseStudyPage from "./pages/CaseStudyPage";
import Insights from "./pages/Insights";
import InsightPost from "./pages/InsightPost";
import NotFound from "./pages/NotFound";
import { getLocaleFromPathname } from "@/lib/localeRouting";

const LocaleRouteSync = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const nextLocale = getLocaleFromPathname(location.pathname);
    if (i18n.resolvedLanguage !== nextLocale) {
      i18n.changeLanguage(nextLocale);
    }
    document.documentElement.lang = nextLocale;
  }, [i18n, location.pathname]);

  return null;
};

const AppRoutes = () => (
  <>
    <LocaleRouteSync />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/de" element={<Index />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/de/privacy" element={<PrivacyPolicy />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/de/apply" element={<Apply />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/de/contact" element={<Contact />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/de/insights" element={<Insights />} />
      <Route path="/insights/:slug" element={<InsightPost />} />
      <Route path="/de/insights/:slug" element={<InsightPost />} />
      <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
      <Route path="/de/case-studies/:slug" element={<CaseStudyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AppRoutes;

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import AppRoutes from "./AppRoutes";

const ROUTES = [
  "/",
  "/privacy",
  "/apply",
  "/contact",
  "/case-studies/expense-receipt-automation",
  "/case-studies/snip-squad",
  "/case-studies/systemically",
  "/case-studies/towarowa",
];

export async function prerender(data: { url?: string } = {}) {
  const url = data.url || "/";
  const queryClient = new QueryClient();

  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );

  return {
    html,
    links: ROUTES,
  };
}

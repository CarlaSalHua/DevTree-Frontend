import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewsProvider } from "./context/ViewsProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ViewsProvider>
        <Router />
        <Toaster richColors position="top-center" />
        <ReactQueryDevtools />
      </ViewsProvider>
    </QueryClientProvider>
  </StrictMode>
);

import { apiClient } from "./api-client";

export function trackPageView(page: string): void {
  // Fire-and-forget — never block the UI
  apiClient.post("/api/analytics/track", { page }).catch(() => {
    // Silently ignore analytics failures
  });
}

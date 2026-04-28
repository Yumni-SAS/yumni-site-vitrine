declare global {
  interface Window {
    sa_event?: (name: string, metadata?: Record<string, string>) => void;
  }
}

export function track(event: string, metadata?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.sa_event === "function") {
    window.sa_event(event, metadata);
  }
}

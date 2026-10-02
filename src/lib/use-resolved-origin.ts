"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * React hook to safely and synchronously resolve window.location.origin on the client
 * without hydration mismatches or cascading re-renders.
 */
export function useResolvedOrigin(serverUrl: string): string {
  const origin = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window !== "undefined" ? window.location.origin : ""),
    () => ""
  );

  if (origin && (!serverUrl || serverUrl.includes("localhost")) && !origin.includes("localhost")) {
    return origin;
  }

  return serverUrl || "http://localhost:3000";
}

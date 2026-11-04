"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const thisYear = () => new Date().getFullYear();

/**
 * The current year. Pages are prerendered once at build, so the buildYear from the server is only a placeholder:
 * hydration uses it, matching the prerendered HTML, and then the visitor's year replaces it, so the footer does not
 * wait for the next deploy after New Year. Without JavaScript the build year stays.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  return useSyncExternalStore(subscribe, thisYear, () => buildYear);
}

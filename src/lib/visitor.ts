"use client";

import { useSyncExternalStore } from "react";

const KEY = "visitor-name";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Keep other open tabs in sync.
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

// Fallback for when storage is blocked (private mode etc.): remember for this page load only.
let memo = "";

function read() {
  try {
    return localStorage.getItem(KEY) ?? memo;
  } catch {
    return memo;
  }
}

/** The visitor's name: "" if not set yet, null while server-rendering / hydrating. */
export function useVisitorName() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function setVisitorName(name: string) {
  memo = name;
  try {
    localStorage.setItem(KEY, name);
  } catch {}
  listeners.forEach((cb) => cb());
}

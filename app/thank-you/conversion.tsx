"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Conversion() {
  useEffect(() => {
    // ===== Form conversion — replace AW-XXXXXXXXXX/FORM_LABEL =====
    window.gtag?.("event", "conversion", { send_to: "AW-XXXXXXXXXX/FORM_LABEL" });
  }, []);
  return null;
}

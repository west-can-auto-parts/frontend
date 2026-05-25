"use client";

import { useEffect } from "react";
import { fetchUserSession } from "@/lib/userSessionApi";

/**
 * Ensures the browser session cookie (customerBrowserId) is used on first load.
 * Garage loads vehicle list when the user opens the Garage dropdown.
 */
export function ExternalUserSessionBootstrap() {
  useEffect(() => {
    let cancelled = false;

    fetchUserSession()
      .then(() => {
        if (!cancelled && process.env.NODE_ENV === "development") {
          console.log("[UserSession] session loaded");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[UserSession]", err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

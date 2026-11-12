"use client";

import { useEffect } from "react";
import { applySettings, useSettings } from "@/store/settings";

/** Loads saved settings once and keeps <html> in sync with the settings store. */
export function SettingsSync() {
  useEffect(() => {
    useSettings.getState().load();
    applySettings(useSettings.getState());
    return useSettings.subscribe(applySettings);
  }, []);
  return null;
}

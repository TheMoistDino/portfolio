import { create } from "zustand";

export type Settings = {
  mode: "dark" | "light";
  hue: number;
  blur: number;
  wallpaper: "grid" | "mesh" | "solid";
  animate: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  mode: "dark",
  hue: 300,
  blur: 14,
  wallpaper: "grid",
  animate: true,
};

const KEY = "portfolio-settings";

type State = Settings & {
  update: (patch: Partial<Settings>) => void;
  reset: () => void;
  load: () => void;
};

function pick(s: Settings): Settings {
  return { mode: s.mode, hue: s.hue, blur: s.blur, wallpaper: s.wallpaper, animate: s.animate };
}

function save(s: Settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(pick(s)));
  } catch {
    // Storage can be blocked (private windows); settings then last for this visit only.
  }
}

export const useSettings = create<State>()((set, get) => ({
  ...DEFAULT_SETTINGS,
  update: (patch) => {
    set(patch);
    save(get());
  },
  reset: () => {
    set(DEFAULT_SETTINGS);
    save(get());
  },
  load: () => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved && typeof saved === "object") set({ ...DEFAULT_SETTINGS, ...saved });
    } catch {
      // Keep the defaults.
    }
  },
}));

/** Writes the settings onto <html> as CSS variables and data attributes. */
export function applySettings(s: Settings) {
  const root = document.documentElement;
  root.dataset.mode = s.mode;
  root.dataset.wall = s.wallpaper;
  root.dataset.anim = s.animate ? "on" : "off";
  root.style.setProperty("--hue", String(s.hue));
  root.style.setProperty("--blur", `${s.blur}px`);
}

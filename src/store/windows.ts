import { create } from "zustand";
import { APPS, type AppId } from "@/apps/meta";
import { getProject } from "@/content/projects";

export const MENU_H = 44;
const DOCK_SPACE = 92;

export type Win = {
  id: string;
  appId: AppId;
  slug?: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type State = {
  wins: Win[];
  topZ: number;
  open: (appId: AppId, slug?: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string) => void;
  setRect: (id: string, rect: Partial<Pick<Win, "x" | "y" | "w" | "h">>) => void;
  closeAll: () => void;
};

export const winId = (appId: AppId, slug?: string) => (slug ? `${appId}:${slug}` : appId);

/** The focused window is the topmost one that isn't minimized. */
export function focusedId(wins: Win[]) {
  let top: Win | null = null;
  for (const w of wins) if (!w.minimized && (!top || w.z > top.z)) top = w;
  return top ? top.id : null;
}

export const useWindows = create<State>()((set, get) => ({
  wins: [],
  topZ: 1,

  open: (appId, slug) => {
    const id = winId(appId, slug);
    const { wins, topZ } = get();
    const z = topZ + 1;
    if (wins.some((w) => w.id === id)) {
      // Already open: bring it back and focus it instead of opening a second one.
      set({ topZ: z, wins: wins.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)) });
      return;
    }
    const meta = APPS[appId];
    const vw = window.innerWidth;
    const vh = window.innerHeight - MENU_H;
    const w = Math.min(meta.w, vw - 16);
    const h = Math.min(meta.h, Math.max(240, vh - DOCK_SPACE));
    const n = wins.length % 4;
    const x = Math.max(8, Math.min((vw - w) / 2 - 180 + n * 220, vw - w - 8));
    const y = Math.max(8, Math.min(20 + n * 36, vh - h - 8));
    const title = (slug && getProject(slug)?.title) || meta.title;
    set({
      topZ: z,
      wins: [...wins, { id, appId, slug, title, x, y, w, h, z, minimized: false, maximized: false }],
    });
  },

  close: (id) => set((s) => ({ wins: s.wins.filter((w) => w.id !== id) })),

  focus: (id) => {
    const { wins, topZ } = get();
    const win = wins.find((w) => w.id === id);
    if (!win || (win.z === topZ && !win.minimized)) return;
    const z = topZ + 1;
    set({ topZ: z, wins: wins.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)) });
  },

  minimize: (id) =>
    set((s) => ({ wins: s.wins.map((w) => (w.id === id ? { ...w, minimized: true } : w)) })),

  toggleMax: (id) =>
    set((s) => ({ wins: s.wins.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)) })),

  setRect: (id, rect) =>
    set((s) => ({ wins: s.wins.map((w) => (w.id === id ? { ...w, ...rect } : w)) })),

  closeAll: () => set({ wins: [] }),
}));

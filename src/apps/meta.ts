export type AppId = "projects" | "project" | "about" | "resume" | "blackjack" | "settings";

/** Title and default window size for each app. `dock` apps get a dock icon, in this order. */
export const APPS: Record<AppId, { title: string; w: number; h: number; dock: boolean }> = {
  projects: { title: "Projects", w: 600, h: 460, dock: true },
  project: { title: "Project", w: 560, h: 600, dock: false },
  about: { title: "About", w: 520, h: 560, dock: true },
  resume: { title: "Resume", w: 560, h: 600, dock: true },
  blackjack: { title: "Blackjack", w: 440, h: 560, dock: true },
  settings: { title: "Settings", w: 400, h: 520, dock: true },
};

export const DOCK_APPS = (Object.keys(APPS) as AppId[]).filter((id) => APPS[id].dock);

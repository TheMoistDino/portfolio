"use client";

import { AnimatePresence, MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DOCK_APPS, type AppId } from "@/apps/meta";
import { APP_COMPONENTS } from "@/apps/registry";
import { getProject } from "@/content/projects";
import { prefersDesktop } from "@/lib/viewPref";
import { focusedId, MENU_H, useWindows } from "@/store/windows";
import { Dock } from "./Dock";
import { MenuBar } from "./MenuBar";
import { Window } from "./Window";

export function Desktop() {
  const wins = useWindows((s) => s.wins);
  const focused = focusedId(wins);
  const router = useRouter();

  useEffect(() => {
    // Phones and visitors who ask for reduced motion get the simple view unless they chose the desktop.
    const small = window.innerWidth < 768;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((small || reduce) && !prefersDesktop()) {
      router.replace("/simple");
      return;
    }
    const { wins, open } = useWindows.getState();
    const target = new URLSearchParams(window.location.search).get("open");
    if (wins.length === 0) open("projects");
    // `/?open=<project slug>` opens that project's window; `/?open=resume` (or any dock app) opens that app.
    if (target && getProject(target)) open("project", target);
    else if (target && (DOCK_APPS as string[]).includes(target)) open(target as AppId);
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const s = useWindows.getState();
      const id = focusedId(s.wins);
      if (id) s.close(id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed inset-0 overflow-hidden text-ink">
        <div className="wallpaper" aria-hidden="true">
          <i className="blob blob-1" />
          <i className="blob blob-2" />
          <i className="blob blob-3" />
          <div className="grid-lines" />
          <div className="grain" />
        </div>

        <MenuBar />

        <main className="absolute inset-x-0 bottom-0" style={{ top: MENU_H }}>
          <h1 className="sr-only">Portfolio desktop</h1>
          <AnimatePresence>
            {wins.map((win) => {
              const App = APP_COMPONENTS[win.appId];
              return (
                <Window key={win.id} win={win} focused={win.id === focused}>
                  <App slug={win.slug} />
                </Window>
              );
            })}
          </AnimatePresence>
        </main>

        <Dock />
      </div>
    </MotionConfig>
  );
}

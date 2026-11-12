"use client";

import { APPS, DOCK_APPS } from "@/apps/meta";
import { getProject } from "@/content/projects";
import { ProjectArt } from "@/components/ProjectBody";
import { focusedId, useWindows, type Win } from "@/store/windows";
import { AppIcon } from "./icons";

const item =
  "dock-item relative grid h-11 w-11 cursor-pointer place-items-center rounded-inner border border-edge";

/** Clicking an icon opens the app, or minimizes it if it is already the focused window. */
function toggle(win: Win | undefined, focused: boolean, open: () => void) {
  if (win && focused) useWindows.getState().minimize(win.id);
  else open();
}

function Dot() {
  return <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-acc" />;
}

export function Dock() {
  const wins = useWindows((s) => s.wins);
  const focused = focusedId(wins);
  const open = useWindows.getState().open;
  const projectWins = wins.filter((w) => w.appId === "project");

  return (
    <nav
      aria-label="Dock"
      className="glass absolute bottom-3 left-1/2 z-[10000] flex -translate-x-1/2 items-center gap-2 rounded-win p-2"
    >
      {DOCK_APPS.map((id) => {
        const win = wins.find((w) => w.id === id);
        return (
          <button
            key={id}
            type="button"
            title={APPS[id].title}
            aria-label={APPS[id].title}
            onClick={() => toggle(win, focused === id, () => open(id))}
            className={`${item} ${win ? "border-transparent bg-acc text-on-acc" : "tile"}`}
          >
            <AppIcon app={id} />
            {win && <Dot />}
          </button>
        );
      })}

      {projectWins.length > 0 && <span className="mx-0.5 h-8 w-px bg-edge" aria-hidden="true" />}
      {projectWins.map((win) => {
        const project = win.slug ? getProject(win.slug) : undefined;
        if (!project) return null;
        return (
          <button
            key={win.id}
            type="button"
            title={win.title}
            aria-label={win.title}
            onClick={() => toggle(win, focused === win.id, () => open("project", win.slug))}
            className={`${item} overflow-visible border-transparent p-0`}
          >
            <ProjectArt project={project} className="h-full w-full rounded-inner text-lg" />
            <Dot />
          </button>
        );
      })}
    </nav>
  );
}

"use client";

import { useState } from "react";
import { ProjectArt } from "@/components/ProjectBody";
import { projectByline, projects, projectTags } from "@/content/projects";
import { useWindows } from "@/store/windows";

export function ProjectsApp() {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects">
        {[null, ...projectTags].map((t) => (
          <button
            key={t ?? "all"}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={`chip cursor-pointer ${tag === t ? "border-transparent bg-acc text-on-acc" : "hover:border-acc"}`}
          >
            {t ?? "All"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {shown.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => useWindows.getState().open("project", p.slug)}
            className="tile flex min-w-0 cursor-pointer items-center gap-3 rounded-inner border border-transparent p-2 text-left hover:border-acc"
          >
            <ProjectArt project={p} className="h-12 w-12 shrink-0 rounded-inner text-xl" />
            <span className="min-w-0">
              <span className="block truncate font-bold">{p.title}</span>
              <span className="block truncate text-xs text-dim">{p.tagline}</span>
              <span className="block truncate font-mono text-[11px] text-dim">{projectByline(p)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

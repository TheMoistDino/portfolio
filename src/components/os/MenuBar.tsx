"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { profile } from "@/content/profile";
import { setPrefersDesktop } from "@/lib/viewPref";
import { focusedId, useWindows } from "@/store/windows";

function subscribeClock(onTick: () => void) {
  const t = setInterval(onTick, 10_000);
  return () => clearInterval(t);
}
function clockNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function MenuBar() {
  const title = useWindows((s) => {
    const id = focusedId(s.wins);
    return s.wins.find((w) => w.id === id)?.title ?? "Desktop";
  });
  const time = useSyncExternalStore(subscribeClock, clockNow, () => "");

  return (
    <header className="glass absolute inset-x-2 top-2 z-[5] flex h-9 items-center gap-3 rounded-inner px-3 text-[13px] font-semibold">
      <span className="h-3.5 w-3.5 shrink-0 rotate-45 rounded-[35%] bg-acc" aria-hidden="true" />
      <span className="truncate">{profile.name}</span>
      <span className="hidden truncate font-medium text-dim sm:inline">{title}</span>
      <span className="flex-1" />
      {profile.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden font-medium text-dim hover:text-ink sm:inline"
        >
          {l.label}
        </a>
      ))}
      <Link
        href="/simple"
        onClick={() => setPrefersDesktop(false)}
        className="rounded-full border border-edge px-3 py-0.5 whitespace-nowrap hover:border-acc"
      >
        Simple view
      </Link>
      <time className="font-mono font-medium tabular-nums">{time}</time>
    </header>
  );
}

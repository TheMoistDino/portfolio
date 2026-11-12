import type { ComponentType } from "react";
import { AboutApp } from "./AboutApp";
import { BlackjackApp } from "./blackjack/BlackjackApp";
import type { AppId } from "./meta";
import { ProjectApp } from "./ProjectApp";
import { ProjectsApp } from "./ProjectsApp";
import { ResumeApp } from "./ResumeApp";
import { SettingsApp } from "./SettingsApp";

export type AppProps = { slug?: string };

/** To add an app: add it to `APPS` in meta.ts, give it an icon in icons.tsx, and list its component here. */
export const APP_COMPONENTS: Record<AppId, ComponentType<AppProps>> = {
  projects: ProjectsApp,
  project: ProjectApp,
  about: AboutApp,
  resume: ResumeApp,
  blackjack: BlackjackApp,
  settings: SettingsApp,
};

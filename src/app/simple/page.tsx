import type { Metadata } from "next";
import Link from "next/link";
import { DesktopLink } from "@/components/DesktopLink";
import { Downloads, ProfileLinks, ResumeSections, Skills } from "@/components/ProfileSections";
import { ProjectArt } from "@/components/ProjectBody";
import { profile } from "@/content/profile";
import { projectByline, projects } from "@/content/projects";

export const metadata: Metadata = { title: "Simple view" };

const heading = "font-display text-xl font-bold";

/** The whole portfolio on one plain page, for quick reading and for phones. */
export default function SimplePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-10 sm:py-16">
      <header className="flex flex-col gap-4">
        <DesktopLink className="self-start rounded-full border border-edge px-3 py-0.5 text-[13px] font-semibold hover:border-acc">
          Switch to desktop view
        </DesktopLink>
        <div>
          <h1 className="font-display text-4xl leading-tight font-bold text-balance sm:text-5xl">{profile.name}</h1>
          <p className="text-lg text-dim">{profile.role}</p>
        </div>
        <div className="flex max-w-[65ch] flex-col gap-3 leading-relaxed">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ProfileLinks />
        <Downloads />
      </header>

      <section className="flex flex-col gap-4" aria-labelledby="projects">
        <h2 id="projects" className={heading}>
          Projects
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug} className="min-w-0">
              <Link
                href={`/projects/${p.slug}`}
                className="flex h-full flex-col gap-3 rounded-win border border-edge bg-surface p-3 hover:border-acc"
              >
                <ProjectArt project={p} className="aspect-[16/7] w-full rounded-inner text-4xl" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold">{p.title}</h3>
                  {p.award && <p className="text-xs font-bold text-acc">{p.award}</p>}
                  <p className="text-sm text-dim">{p.tagline}</p>
                  {p.tech.length > 0 && <p className="font-mono text-xs text-dim">{projectByline(p)}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="skills">
        <h2 id="skills" className={heading}>
          Skills
        </h2>
        <Skills />
      </section>

      <ResumeSections headingClass={heading} />
    </div>
  );
}

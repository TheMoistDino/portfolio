import Image from "next/image";
import type { Project } from "@/content/projects";

/** Gradient placeholder shown until a project has real screenshots. */
export function ProjectArt({ project, className = "" }: { project: Project; className?: string }) {
  const h = project.hue;
  return (
    <div
      aria-hidden="true"
      className={`grid place-items-center font-display font-bold text-white ${className}`}
      style={{
        background: `linear-gradient(135deg, oklch(0.68 0.16 ${h}), oklch(0.46 0.17 ${h + 45}))`,
      }}
    >
      {project.title[0].toUpperCase()}
    </div>
  );
}

/** The project write-up. Used in the project window and on the static project page. */
export function ProjectBody({ project, as: Heading = "h2" }: { project: Project; as?: "h1" | "h2" }) {
  const shot = project.images[0];
  const links = [
    { label: "Live site", href: project.siteUrl },
    { label: "Live demo", href: project.demoUrl },
    { label: "Devpost", href: project.devpostUrl },
    { label: "Source", href: project.repoUrl },
  ].filter((l) => l.href);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[16/8] overflow-hidden rounded-inner">
        {shot ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        ) : (
          <ProjectArt project={project} className="h-full w-full text-6xl" />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        {project.award && (
          <span className="self-start rounded-full bg-acc px-2.5 py-0.5 text-xs font-bold text-on-acc">
            {project.award}
          </span>
        )}
        <Heading className="font-display text-2xl leading-tight font-bold text-balance">{project.title}</Heading>
        <p className="text-dim">{project.tagline}</p>
        <p className="font-mono text-xs text-dim">{[project.when, project.role].filter(Boolean).join(" · ")}</p>
      </div>

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {links.map((l, i) => (
            <a
              key={l.label}
              className={`btn ${i === 0 ? "btn-pri" : ""}`}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <div className="flex max-w-[65ch] flex-col gap-3 text-sm leading-relaxed">
        {project.description.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {project.highlights.length > 0 && (
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed marker:text-acc">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      {project.images.length > 1 && (
        <div className="grid grid-cols-2 gap-2">
          {project.images.slice(1).map((img) => (
            <div key={img.src} className="relative aspect-video overflow-hidden rounded-inner">
              <Image src={img.src} alt={img.alt} fill sizes="360px" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

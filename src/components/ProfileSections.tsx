import { documents, profile, type Entry } from "@/content/profile";

/** Skills grouped by category. Used in the About window and the simple view. */
export function Skills() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {profile.skills.map((s) => (
        <div key={s.group} className="flex flex-col gap-1.5">
          <h3 className="text-xs font-bold tracking-wider text-dim uppercase">{s.group}</h3>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((i) => (
              <span key={i} className="chip">
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** A list of dated entries (jobs or degrees). Used in the Resume window and the simple view. */
export function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="flex flex-col gap-5 border-l border-edge pl-4">
      {entries.map((e) => (
        <li key={e.title + e.org} className="relative flex flex-col gap-1">
          <span className="absolute top-1.5 -left-[21px] h-2.5 w-2.5 rounded-full bg-acc" aria-hidden="true" />
          <h3 className="leading-snug font-bold">{e.title}</h3>
          <p className="text-sm text-dim">
            {e.org} · <span className="font-mono text-xs">{e.period}</span>
          </p>
          {e.points && (
            <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed marker:text-acc">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

export function ProfileLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      {profile.links.map((l) => (
        <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label}
        </a>
      ))}
    </div>
  );
}

/** The resume and CV downloads, side by side. Renders nothing until at least one PDF has been added. */
export function Downloads() {
  const available = documents.filter((d) => d.available);
  if (available.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {available.map((d, i) => (
        <a
          key={d.id}
          href={d.href}
          download={d.fileName}
          className="tile flex flex-col gap-0.5 rounded-inner border border-edge p-3 hover:border-acc"
        >
          <span className="font-bold">
            Download {d.label} <span className="font-mono text-xs font-normal text-dim">PDF</span>
          </span>
          <span className="text-sm text-dim">{d.note}</span>
          {i === 0 && available.length > 1 && (
            <span className="text-xs font-semibold text-acc">Start here if you are short on time</span>
          )}
        </a>
      ))}
    </div>
  );
}

const sectionHeading = "text-xs font-bold tracking-wider text-dim uppercase";

/** Experience, teaching, leadership and education, in resume order. */
export function ResumeSections({ headingClass = sectionHeading }: { headingClass?: string }) {
  const sections = [
    { title: "Experience", entries: profile.experience },
    { title: "Teaching & tutoring", entries: profile.teaching },
    { title: "Leadership", entries: profile.leadership },
    { title: "Education", entries: profile.education },
  ];
  return (
    <>
      {sections.map((s) => (
        <section key={s.title} className="flex flex-col gap-3">
          <h2 className={headingClass}>{s.title}</h2>
          <Timeline entries={s.entries} />
        </section>
      ))}
    </>
  );
}

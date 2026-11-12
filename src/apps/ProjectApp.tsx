import Link from "next/link";
import { ProjectBody } from "@/components/ProjectBody";
import { getProject } from "@/content/projects";

export function ProjectApp({ slug }: { slug?: string }) {
  const project = slug ? getProject(slug) : undefined;
  if (!project) return <p className="text-dim">This project could not be found.</p>;

  return (
    <div className="flex flex-col gap-4">
      <ProjectBody project={project} />
      <Link href={`/projects/${project.slug}`} className="self-start text-sm font-semibold text-dim underline hover:text-ink">
        Open as a full page
      </Link>
    </div>
  );
}

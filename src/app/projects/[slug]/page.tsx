import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesktopLink } from "@/components/DesktopLink";
import { ProjectBody } from "@/components/ProjectBody";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.tagline } : {};
}

/** A plain, shareable page for one project. */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 sm:py-16">
      <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-dim">
        <Link href="/simple" className="hover:text-ink">
          ← All projects
        </Link>
        <DesktopLink open={project.slug} className="hover:text-ink">
          Open in desktop view
        </DesktopLink>
      </nav>
      <main>
        <ProjectBody project={project} as="h1" />
      </main>
    </div>
  );
}

import { Downloads, ResumeSections } from "@/components/ProfileSections";

export function ResumeApp() {
  return (
    <div className="flex flex-col gap-5">
      <Downloads />
      <ResumeSections />
    </div>
  );
}

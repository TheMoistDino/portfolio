import { Downloads, ProfileLinks, Skills } from "@/components/ProfileSections";
import { profile } from "@/content/profile";

export function AboutApp() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        {/* TODO: replace with a photo (public/me.jpg) */}
        <div
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-acc font-display text-xl font-bold text-on-acc"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-2xl leading-tight font-bold">{profile.name}</h2>
          <p className="text-dim">{profile.role}</p>
        </div>
      </div>

      <div className="flex max-w-[65ch] flex-col gap-3 text-sm leading-relaxed">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <ProfileLinks />
      <Downloads />
      <Skills />
    </div>
  );
}

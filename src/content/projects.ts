// Screenshots go in public/projects/<slug>/ and are listed in `images`.

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string[];
  highlights: string[];
  tech: string[];
  /** Filter chips in the Projects window. */
  tags: string[];
  /** When it was built, e.g. "Apr 2026". */
  when?: string;
  role: string;
  /** Shown as a badge, e.g. "2nd place, IDEA Hacks 2026". */
  award?: string;
  images: { src: string; alt: string }[];
  demoUrl?: string;
  repoUrl?: string;
  devpostUrl?: string;
  /** Color of the placeholder art shown when there are no screenshots (0-360). */
  hue: number;
};

export const projects: Project[] = [
  {
    slug: "cpr-trainer",
    title: "CPR Trainer",
    tagline: "A wearable that coaches CPR compressions in real time, with no mannequin, PC or internet.",
    description: [
      "CPR Trainer is a wearable prototype that gives live feedback on chest compressions. An ESP32 reads an FSR pressure sensor and an ADXL335 accelerometer, so practice needs no mannequin, computer or internet connection.",
      "The device hosts its own Wi-Fi dashboard that tracks compression rate, relative force, recoil quality and a motion score. Adaptive calibration sets the thresholds for each user and surface.",
      "The team went through three hardware and software architectures before settling on a fully standalone system. I helped build the presentation and ran testing and demos.",
    ],
    highlights: [
      "Real-time compression feedback from a pressure sensor and an accelerometer",
      "Self-hosted Wi-Fi dashboard served from the ESP32",
      "Adaptive calibration that personalizes thresholds across users and surfaces",
    ],
    tech: ["ESP32", "FSR pressure sensor", "ADXL335 accelerometer", "Wi-Fi dashboard"],
    tags: ["Hackathon", "Hardware"],
    when: "Apr 2026",
    role: "Presentation, testing and demos",
    award: "2nd place, IDEA Hacks 2026",
    images: [],
    devpostUrl: "https://devpost.com/software/cpr-trainer-a9olkm",
    hue: 20,
  },
  {
    slug: "domain-cv",
    title: "domain.cv",
    tagline: "A hackathon project that took 3rd place at UCLA Hack on the Hill XIII. I built the backend.",
    // TODO: say what domain.cv does, add the tech used, the date and a few highlights.
    description: [
      "domain.cv won 3rd place at UCLA Hack on the Hill XIII. I developed the backend.",
    ],
    highlights: [],
    tech: [],
    tags: ["Hackathon", "Backend"],
    role: "Backend developer",
    award: "3rd place, UCLA Hack on the Hill XIII",
    images: [],
    devpostUrl: "https://devpost.com/software/domain-cv",
    hue: 250,
  },
  {
    slug: "hkn-opportunities",
    title: "HKN Opportunities Platform",
    tagline: "A full-stack hub for IEEE-HKN events, scholarships and ways to get involved.",
    description: [
      "As IEEE-HKN webmaster I built a centralized Opportunities platform in Go, MySQL and Tailwind CSS. I designed normalized database schemas, migrations and authenticated endpoints for events, scholarships and involvement initiatives.",
      "Officers manage the content through role-based admin dashboards with full create, read, update and delete workflows.",
    ],
    highlights: [
      "Strict input and URL validation, with CSRF protection on every state-changing endpoint",
      "Self-service password reset over SMTP with hashed tokens, expiry checks and a 30-second cooldown",
      "Legacy routes kept working through redirects",
    ],
    tech: ["Go", "MySQL", "Tailwind CSS"],
    tags: ["Web", "Backend"],
    when: "Apr 2026 – Present",
    role: "Webmaster, IEEE-HKN",
    images: [],
    hue: 150,
  },
  {
    slug: "side-quest",
    title: "Side Quest",
    tagline: "A hackathon project whose backend coordinates specialized agents that each find a different piece of information.",
    // TODO: say what Side Quest does for its users, add the tech used, the hackathon and the date.
    description: [
      "I built the backend for Side Quest. It coordinates several agents, each with one specific job, and combines the different pieces of information they find.",
    ],
    highlights: [],
    tech: [],
    tags: ["Hackathon", "Backend"],
    role: "Backend developer",
    images: [],
    devpostUrl: "https://devpost.com/software/fitlens-1ip53j",
    hue: 300,
  },
  {
    slug: "donkey-racers",
    title: "IEEE Donkey Racers",
    tagline: "Autonomy software for a Raspberry Pi race car.",
    description: [
      "I developed Python autonomy algorithms for a Raspberry Pi racing platform and tracked down low-level I2C communication errors where the hardware and software meet.",
      "I also set up telemetry tools that give real-time feedback from the vehicle for debugging and performance tuning.",
    ],
    highlights: [
      "Python autonomy algorithms running on a Raspberry Pi",
      "Debugged I2C communication between the computer and the vehicle hardware",
      "Real-time telemetry for tuning",
    ],
    tech: ["Python", "Raspberry Pi", "I2C"],
    tags: ["Hardware"],
    when: "Oct 2025 – Mar 2026",
    role: "Autonomy software and telemetry",
    images: [],
    hue: 200,
  },
];

export const projectTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** One short line under a project's name in lists: its tech, or its award or role if no tech is listed. */
export function projectByline(p: Project) {
  return p.tech.length ? p.tech.join(" · ") : (p.award ?? p.role);
}

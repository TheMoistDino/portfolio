export const SITE_URL = "https://portfolio.darrenluu.com";

export type Entry = { title: string; org: string; period: string; points?: string[] };

export const profile = {
  name: "Darren Luu",
  role: "Computer Engineering student at UCLA",
  bio: [
    "I'm a second-year Computer Engineering student at UCLA with a technical breadth in Electrical Engineering. My work sits where software meets hardware, which shows in my hackathon projects and in my firmware role at the Mechatronics and Controls Laboratory.",
    "My main interest is quantum computing. I'm working toward graduate school and learning the field so that I can contribute to it. I see myself in an engineering role that advances quantum information science and makes quantum computers reliable to use.",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/TheMoistDino" },
    // TODO: { label: "LinkedIn", href: "https://www.linkedin.com/in/..." },
  ],
  skills: [
    { group: "Programming", items: ["Python (NumPy)", "MATLAB", "C++", "Go", "Java", "SQL (MySQL)"] },
    { group: "Hardware", items: ["ESP32", "STM32", "Raspberry Pi", "I2C / SPI / UART", "FreeRTOS", "PWM / DShot telemetry", "Sensor integration"] },
    { group: "Software", items: ["Git / GitHub", "KiCad", "Onshape (CAD)"] },
    { group: "Honor societies", items: ["IEEE-Eta Kappa Nu", "Tau Beta Pi", "Upsilon Pi Epsilon"] },
  ],
  experience: [
    {
      title: "Firmware Engineer",
      org: "Mechatronics and Controls Laboratory",
      period: "Jun 2026 – Present",
      points: [
        "Developed a modular Python sizing model that uses manufacturer load profiles to determine voltage and current headroom and to select flight-rated ESCs and battery subsystems for a 6-DOF underwater autonomous vehicle.",
        "Evaluated ESC communication architectures and recommended digital Bidirectional DShot over PWM to support deterministic telemetry (eRPM feedback) and error-checked control loops.",
        "Reviewed schematics and pinouts between a custom motor-control PCB and an ESP32 to ensure peripheral compatibility for multi-thruster actuation and SPI/UART communication.",
      ],
    },
    {
      title: "Webmaster",
      org: "IEEE-HKN",
      period: "Apr 2026 – Present",
      points: [
        "Engineered a centralized full-stack Opportunities platform in Go, MySQL and Tailwind CSS, with normalized schemas, migrations and authenticated endpoints for events, scholarships and involvement initiatives.",
        "Built role-based officer dashboards with full CRUD workflows, strict input and URL validation, and CSRF protection on state-changing endpoints, while preserving legacy routes through redirects.",
        "Implemented self-service password reset with Go and SMTP email, secured by hashed reset tokens, expiry checks and a 30-second cooldown.",
      ],
    },
  ] as Entry[],
  teaching: [
    {
      title: "Drop-in Tutor",
      org: "IEEE-HKN, Tau Beta Pi & Upsilon Pi Epsilon, UCLA",
      period: "Spring 2026 – Present",
      points: [
        "Hold weekly drop-in tutoring hours for EC ENGR M16 (Logic Design of Digital Systems) and lower-division math and physics.",
      ],
    },
    {
      title: "Peer Tutor, AP Calculus & SAT Math",
      org: "Academic & STEM Tutoring",
      period: "Aug 2023 – Jun 2024",
      points: [
        "Mentored 60+ domestic and international students across AP Calculus AB and SAT Math cohorts, analyzing 500+ diagnostic assessments to build targeted instructional videos and personalized curricula.",
      ],
    },
  ] as Entry[],
  leadership: [
    {
      title: "Co-Founder & Treasurer",
      org: "Open Origins @ UCLA",
      period: "Oct 2025 – Present",
      points: [
        "Co-founded a university multicultural organization and built an automated financial and participation tracking system for club procurement, budget allocation and member analytics.",
      ],
    },
  ] as Entry[],
  education: [
    {
      title: "B.S. Computer Engineering",
      org: "University of California, Los Angeles (UCLA)",
      period: "Expected Jun 2029",
      points: [
        "GPA 3.935 · Dean's List · Technical breadth in Electrical Engineering",
        "Coursework: Systems & Signals, Digital Signal Processing (in progress), Computer Organization & Architecture, Logic Design of Digital Systems, Data Structures & Algorithms, Internet of Things, Differential Equations, Probability",
      ],
    },
  ] as Entry[],
};

/**
 * The two downloads. Add the PDFs as public/resume.pdf and public/cv.pdf.
 * Each option appears on the site once its file exists (checked at build time in next.config.ts).
 */
export const documents = [
  {
    id: "resume",
    label: "Resume",
    note: "One page with the highlights",
    href: "/resume.pdf",
    fileName: "Darren-Luu-Resume.pdf",
    available: process.env.NEXT_PUBLIC_HAS_RESUME === "1",
  },
  {
    id: "cv",
    label: "CV",
    note: "Every role and project in full",
    href: "/cv.pdf",
    fileName: "Darren-Luu-CV.pdf",
    available: process.env.NEXT_PUBLIC_HAS_CV === "1",
  },
];

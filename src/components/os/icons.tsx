import type { AppId } from "@/apps/meta";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function AppIcon({ app, className = "h-5 w-5" }: { app: AppId; className?: string }) {
  switch (app) {
    case "projects":
    case "project":
      return (
        <svg {...base} className={className}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
        </svg>
      );
    case "about":
      return (
        <svg {...base} className={className}>
          <circle cx="12" cy="8.5" r="3.8" />
          <path d="M4.5 20c1-4 4-5.5 7.5-5.5s6.5 1.5 7.5 5.5" />
        </svg>
      );
    case "resume":
      return (
        <svg {...base} className={className}>
          <path d="M6.5 3.5h8l3.5 3.5v13.5h-11.5z" />
          <path d="M9.5 12h5M9.5 16h5" />
        </svg>
      );
    case "blackjack":
      return (
        <svg {...base} className={className}>
          <path d="M12 3.5c2.800 3.700 7 5.700 7 9.700a3.400 3.400 0 0 1-6.100 2c.2 2 .9 3.500 2.100 4.800H9c1.200-1.300 1.900-2.800 2.100-4.800a3.400 3.400 0 0 1-6.100-2c0-4 4.200-6 7-9.700z" />
        </svg>
      );
    case "settings":
      return (
        <svg {...base} className={className}>
          <path d="M4 8h9M17 8h3M4 16h3M11 16h9" />
          <circle cx="15" cy="8" r="2" />
          <circle cx="9" cy="16" r="2" />
        </svg>
      );
  }
}

const ctl = { viewBox: "0 0 10 10", className: "h-2.5 w-2.5", "aria-hidden": true } as const;
const line = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", fill: "none" } as const;

export const MinimizeIcon = () => (
  <svg {...ctl}>
    <path d="M2 5h6" {...line} />
  </svg>
);
export const MaximizeIcon = () => (
  <svg {...ctl}>
    <rect x="2" y="2" width="6" height="6" rx="1.2" {...line} strokeWidth={1.4} />
  </svg>
);
export const CloseIcon = () => (
  <svg {...ctl}>
    <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" {...line} />
  </svg>
);

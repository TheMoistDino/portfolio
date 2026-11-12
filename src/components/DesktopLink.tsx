"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { setPrefersDesktop } from "@/lib/viewPref";

/** Link to the desktop view. Remembers the choice so phones aren't sent back to the simple view. */
export function DesktopLink({
  open,
  className,
  children,
}: {
  /** Project slug to open in a window on arrival. */
  open?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={open ? `/?open=${open}` : "/"} onClick={() => setPrefersDesktop(true)} className={className}>
      {children}
    </Link>
  );
}

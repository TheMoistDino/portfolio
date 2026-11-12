// Remembers that a visitor on a phone (or with reduced motion) chose the desktop view anyway.
const KEY = "portfolio-view";

export function prefersDesktop() {
  try {
    return localStorage.getItem(KEY) === "desktop";
  } catch {
    return false;
  }
}

export function setPrefersDesktop(on: boolean) {
  try {
    if (on) localStorage.setItem(KEY, "desktop");
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: the choice applies to this navigation only.
  }
}

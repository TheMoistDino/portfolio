"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Rnd } from "react-rnd";
import { useWindows, type Win } from "@/store/windows";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./icons";

const ctlBtn =
  "grid h-6 w-6 cursor-pointer place-items-center rounded-full hover:bg-acc hover:text-on-acc";

export function Window({ win, focused, children }: { win: Win; focused: boolean; children: ReactNode }) {
  const { focus, close, minimize, toggleMax, setRect } = useWindows.getState();

  return (
    <Rnd
      position={win.maximized ? { x: 0, y: 0 } : { x: win.x, y: win.y }}
      size={
        win.maximized
          ? { width: "100%", height: "calc(100% - 88px)" }
          : { width: win.w, height: win.h }
      }
      minWidth={280}
      minHeight={220}
      bounds="parent"
      dragHandleClassName="win-bar"
      cancel=".win-ctl"
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
      onDragStart={() => focus(win.id)}
      onDragStop={(_e, d) => setRect(win.id, { x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, el, _delta, pos) =>
        setRect(win.id, { w: el.offsetWidth, h: el.offsetHeight, x: pos.x, y: pos.y })
      }
      style={{ zIndex: win.z, pointerEvents: win.minimized ? "none" : "auto" }}
    >
      <motion.section
        role="dialog"
        aria-label={win.title}
        inert={win.minimized}
        onPointerDownCapture={() => focus(win.id)}
        onFocusCapture={() => focus(win.id)}
        initial={{ opacity: 0, scale: 0.9, y: 28 }}
        animate={
          win.minimized ? { opacity: 0, scale: 0.8, y: 90 } : { opacity: 1, scale: 1, y: 0 }
        }
        exit={{ opacity: 0, scale: 0.94, y: 10, transition: { duration: 0.14 } }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className={`glass flex h-full w-full flex-col overflow-hidden rounded-win shadow-win ${
          focused ? "" : "brightness-90"
        }`}
      >
        <header
          className="win-bar flex shrink-0 cursor-grab items-center gap-2 py-2 pr-2 pl-4 select-none active:cursor-grabbing"
          onDoubleClick={() => toggleMax(win.id)}
        >
          <h2 className="min-w-0 flex-1 truncate font-display text-[15px] font-bold">{win.title}</h2>
          <div className="win-ctl flex gap-0.5 rounded-full border border-edge p-0.5">
            <button type="button" className={ctlBtn} aria-label={`Minimize ${win.title}`} onClick={() => minimize(win.id)}>
              <MinimizeIcon />
            </button>
            <button
              type="button"
              className={ctlBtn}
              aria-label={`${win.maximized ? "Restore" : "Maximize"} ${win.title}`}
              onClick={() => toggleMax(win.id)}
            >
              <MaximizeIcon />
            </button>
            <button type="button" className={ctlBtn} aria-label={`Close ${win.title}`} onClick={() => close(win.id)}>
              <CloseIcon />
            </button>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-1 pb-4">{children}</div>
      </motion.section>
    </Rnd>
  );
}

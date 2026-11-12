"use client";

import type { ReactNode } from "react";
import { useSettings, type Settings } from "@/store/settings";
import { useWindows } from "@/store/windows";

const HUES = [300, 250, 190, 150, 75, 25];

function Field({ label, value, children }: { label: string; value?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm font-semibold">
        <span>{label}</span>
        {value && <span className="font-mono font-normal text-dim tabular-nums">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-inner border border-edge" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 cursor-pointer px-2 py-1.5 text-sm not-first:border-l not-first:border-edge ${
            value === o.value ? "bg-acc font-bold text-on-acc" : "hover:bg-edge"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SettingsApp() {
  const s = useSettings();
  const set = (patch: Partial<Settings>) => s.update(patch);

  return (
    <div className="flex flex-col gap-5">
      <Field label="Appearance">
        <Segmented
          label="Appearance"
          value={s.mode}
          onChange={(mode) => set({ mode })}
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
          ]}
        />
      </Field>

      <Field label="Accent color" value={`${s.hue}°`}>
        <div className="flex flex-wrap gap-2">
          {HUES.map((h) => (
            <button
              key={h}
              type="button"
              aria-label={`Accent hue ${h}`}
              aria-pressed={s.hue === h}
              onClick={() => set({ hue: h })}
              className={`h-7 w-7 cursor-pointer rounded-full border-2 ${s.hue === h ? "border-ink" : "border-transparent"}`}
              style={{ background: `oklch(var(--acc-l) var(--acc-c) ${h})` }}
            />
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={360}
          value={s.hue}
          aria-label="Accent hue"
          onChange={(e) => set({ hue: Number(e.target.value) })}
          className="w-full accent-acc"
        />
      </Field>

      <Field label="Wallpaper">
        <Segmented
          label="Wallpaper"
          value={s.wallpaper}
          onChange={(wallpaper) => set({ wallpaper })}
          options={[
            { value: "grid", label: "Grid" },
            { value: "mesh", label: "Mesh" },
            { value: "solid", label: "Solid" },
          ]}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={s.animate}
            onChange={(e) => set({ animate: e.target.checked })}
            className="h-4 w-4 accent-acc"
          />
          Animate the wallpaper
        </label>
      </Field>

      <Field label="Glass blur" value={`${s.blur}px`}>
        <input
          type="range"
          min={0}
          max={40}
          value={s.blur}
          aria-label="Glass blur"
          onChange={(e) => set({ blur: Number(e.target.value) })}
          className="w-full accent-acc"
        />
      </Field>

      <div className="flex flex-wrap gap-2 border-t border-edge pt-4">
        <button type="button" className="btn" onClick={() => s.reset()}>
          Restore default look
        </button>
        <button type="button" className="btn" onClick={() => useWindows.getState().closeAll()}>
          Close all windows
        </button>
      </div>
    </div>
  );
}

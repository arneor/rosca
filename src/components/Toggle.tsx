"use client";

import * as React from "react";

export interface ToggleProps {
  options: Array<{ value: string; label: string }>; 
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function Toggle({ options, value, onChange, ariaLabel = "Toggle", className = "" }: ToggleProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={`inline-flex items-center rounded-[var(--radius-sm)] border border-border bg-surface p-1 ${className}`}>
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isSelected}
            className={`px-3 h-9 rounded-[calc(var(--radius-sm)-4px)] text-sm transition-colors ${
              isSelected ? "bg-brand-600 text-white" : "text-foreground hover:bg-surface-muted"
            }`}
            onClick={() => onChange(opt.value)}
            type="button"
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default Toggle;



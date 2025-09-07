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
    <div role="tablist" aria-label={ariaLabel} className={`inline-flex items-center rounded-lg border border-border-primary bg-surface-secondary p-1 ${className}`}>
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isSelected}
            className={`px-3 h-8 rounded-md text-sm font-medium transition-all duration-200 ${
              isSelected 
                ? "bg-accent-primary text-white shadow-sm" 
                : "text-text-secondary hover:text-text-primary hover:bg-surface-primary"
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



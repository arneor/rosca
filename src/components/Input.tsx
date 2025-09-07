"use client";

import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, leftIcon, rightIcon, id, className = "", ...props },
    ref
  ) => {
    const inputId = id || React.useId();
    const describedByIds: string[] = [];
    if (hint) describedByIds.push(`${inputId}-hint`);
    if (error) describedByIds.push(`${inputId}-error`);

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label ? (
          <label htmlFor={inputId} className="text-sm text-muted">
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`h-11 rounded-[var(--radius-sm)] border border-border bg-surface text-foreground placeholder:text-muted focus-ring ${
              leftIcon ? "pl-10" : "pl-3"
            } ${rightIcon ? "pr-10" : "pr-3"}`}
            aria-invalid={!!error}
            aria-describedby={describedByIds.join(" ") || undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {hint && !error ? (
          <p id={`${inputId}-hint`} className="text-xs text-muted">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-danger">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

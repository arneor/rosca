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
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const describedByIds: string[] = [];
    if (hint) describedByIds.push(`${inputId}-hint`);
    if (error) describedByIds.push(`${inputId}-error`);

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
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
            className={`h-10 rounded-lg border border-border-primary bg-surface-primary text-text-primary placeholder:text-text-muted focus-ring transition-colors hover:border-accent-secondary/50 focus:border-accent-secondary ${
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
          <p id={`${inputId}-hint`} className="text-xs text-text-tertiary">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-accent-danger">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

"use client";

import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, className = "", children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none rounded-lg";
    
    const variants: Record<ButtonVariant, string> = {
      primary: "bg-accent-primary text-white hover:bg-accent-primary/90 shadow-sm hover:shadow-md",
      secondary: "bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary shadow-sm",
      ghost: "text-text-primary hover:bg-surface-secondary",
      danger: "bg-accent-danger text-white hover:bg-accent-danger/90 shadow-sm hover:shadow-md",
      success: "bg-accent-primary text-white hover:bg-accent-primary/90 shadow-sm hover:shadow-md",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "h-8 px-3 text-sm gap-1",
      md: "h-10 px-4 text-sm gap-2", 
      lg: "h-12 px-6 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

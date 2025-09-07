"use client";

import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none transform hover:scale-102";
    
    const variants: Record<ButtonVariant, string> = {
      primary: "text-white hover:shadow-lg",
      secondary: "border text-white hover:shadow-md",
      ghost: "text-white hover:bg-opacity-10",
      danger: "text-white hover:shadow-lg",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm", 
      lg: "h-11 px-6 text-base",
    };

    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return {
            background: 'linear-gradient(135deg, var(--financial-blue), var(--accent-blue))',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          };
        case "secondary":
          return {
            background: 'var(--card-background)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-sm)',
            backdropFilter: 'var(--glass-backdrop-blur)'
          };
        case "ghost":
          return {
            background: 'transparent',
            borderRadius: 'var(--radius-sm)'
          };
        case "danger":
          return {
            background: 'linear-gradient(135deg, var(--error-red), #dc2626)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
          };
        default:
          return {};
      }
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        style={getVariantStyles()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

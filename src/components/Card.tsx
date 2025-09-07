import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ header, footer, className = "", children, ...props }: CardProps) {
  return (
    <div className={`card p-6 ${className}`} {...props}>
      {header ? <div className="mb-4 text-sm font-medium text-text-secondary">{header}</div> : null}
      <div>{children}</div>
      {footer ? <div className="mt-4 text-sm text-text-tertiary">{footer}</div> : null}
    </div>
  );
}

export default Card;



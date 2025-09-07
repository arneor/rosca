import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ header, footer, className = "", children, ...props }: CardProps) {
  return (
    <div className={`card p-4 ${className}`} {...props}>
      {header ? <div className="mb-3 text-sm text-muted">{header}</div> : null}
      <div>{children}</div>
      {footer ? <div className="mt-3 text-sm text-muted">{footer}</div> : null}
    </div>
  );
}

export default Card;



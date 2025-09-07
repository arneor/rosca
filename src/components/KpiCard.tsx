import * as React from "react";
import Card from "@/components/Card";

export interface KpiCardProps {
  label: string;
  value: string;
  sublabel?: string;
  action?: React.ReactNode;
}

export function KpiCard({ label, value, sublabel, action }: KpiCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{label}</p>
          <p className="text-3xl font-bold text-text-primary mb-1">{value}</p>
          {sublabel ? <p className="text-sm text-text-tertiary">{sublabel}</p> : null}
        </div>
        {action ? <div className="flex-shrink-0 ml-4">{action}</div> : null}
      </div>
    </Card>
  );
}

export default KpiCard;



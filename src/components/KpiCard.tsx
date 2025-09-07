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
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {sublabel ? <p className="text-xs text-muted mt-1">{sublabel}</p> : null}
        </div>
        {action ? <div className="text-sm">{action}</div> : null}
      </div>
    </Card>
  );
}

export default KpiCard;



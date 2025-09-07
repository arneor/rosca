"use client";

import * as React from "react";
import KpiCard from "@/components/KpiCard";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

interface AlertItem {
  id: string;
  type: "overdue" | "approval" | "dispute" | "emergency";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  timestamp: Date;
  actionLabel: string;
  actionHref?: string;
}

interface ActivityItem {
  id: string;
  type: "payment" | "member" | "payout" | "group";
  description: string;
  timestamp: Date;
  amount?: number;
  groupName?: string;
  memberName?: string;
}

interface DashboardMetrics {
  totalGroups: {
    value: number;
    active: number;
    paused: number;
    completed: number;
  };
  totalMembers: {
    value: number;
    newThisMonth: number;
    activeRate: number;
  };
  financialVolume: {
    value: number;
    monthlyGrowth: number;
    currency: string;
  };
  completionRate: {
    value: number;
    completed: number;
    total: number;
  };
  riskMetrics: {
    overduePayments: number;
    defaultRisk: number;
    disputesOpen: number;
  };
}

export function AdminDashboard() {
  // Mock data - in real implementation, this would come from API
  const [metrics] = React.useState<DashboardMetrics>({
    totalGroups: { value: 12, active: 10, paused: 2, completed: 34 },
    totalMembers: { value: 248, newThisMonth: 12, activeRate: 94.2 },
    financialVolume: { value: 56200, monthlyGrowth: 5.2, currency: "USD" },
    completionRate: { value: 82, completed: 34, total: 46 },
    riskMetrics: { overduePayments: 3, defaultRisk: 2.1, disputesOpen: 1 }
  });

  const [alerts] = React.useState<AlertItem[]>([
    {
      id: "1",
      type: "overdue",
      title: "John D. overdue payment",
      description: "$200 in Group A - Due 3 days ago",
      priority: "high",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      actionLabel: "Send reminder"
    },
    {
      id: "2",
      type: "approval",
      title: "Member approval pending",
      description: "3 new member requests awaiting review",
      priority: "medium",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionLabel: "Review",
      actionHref: "/admin/members/pending"
    },
    {
      id: "3",
      type: "dispute",
      title: "Payment dispute raised",
      description: "Group B - Member claims double payment",
      priority: "high",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      actionLabel: "Investigate"
    }
  ]);

  const [recentActivity] = React.useState<ActivityItem[]>([
    {
      id: "1",
      type: "payment",
      description: "Payment received from Alice",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      amount: 100,
      groupName: "Group B",
      memberName: "Alice"
    },
    {
      id: "2",
      type: "member",
      description: "New member joined Group C",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      memberName: "Rahul",
      groupName: "Group C"
    },
    {
      id: "3",
      type: "payout",
      description: "Group A payout processed",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      amount: 2000,
      groupName: "Group A"
    },
    {
      id: "4",
      type: "group",
      description: "Group D cycle completed successfully",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      groupName: "Group D"
    }
  ]);

  const getAlertIcon = (type: AlertItem['type']) => {
    switch (type) {
      case "overdue":
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "approval":
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "dispute":
        return (
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted mt-1">
            Real-time overview of groups, members, and financial health
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add Member
          </Button>
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Group
          </Button>
        </div>
      </header>

      {/* Key Metrics */}
      <section
        aria-labelledby="kpi-cards"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <h2 id="kpi-cards" className="sr-only">Key metrics</h2>
        
        <KpiCard
          label="Total Groups"
          value={metrics.totalGroups.value.toString()}
          sublabel={`${metrics.totalGroups.active} active, ${metrics.totalGroups.paused} paused`}
          action={
            <a className="text-brand-600 hover:text-brand-700" href="/admin/groups">
              Manage
            </a>
          }
        />
        
        <KpiCard
          label="Total Members"
          value={metrics.totalMembers.value.toString()}
          sublabel={`+${metrics.totalMembers.newThisMonth} this month`}
          action={
            <a className="text-brand-600 hover:text-brand-700" href="/admin/members">
              View
            </a>
          }
        />
        
        <KpiCard
          label="Financial Volume"
          value={formatCurrency(metrics.financialVolume.value)}
          sublabel={`+${metrics.financialVolume.monthlyGrowth}% vs last month`}
          action={
            <a className="text-brand-600 hover:text-brand-700" href="/admin/reports/financial">
              Reports
            </a>
          }
        />
        
        <KpiCard
          label="Completion Rate"
          value={`${metrics.completionRate.value}%`}
          sublabel={`${metrics.completionRate.completed} completed`}
          action={
            <a className="text-brand-600 hover:text-brand-700" href="/admin/reports/groups">
              Analytics
            </a>
          }
        />
      </section>

      {/* Risk Indicators */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-900">Overdue Payments</p>
              <p className="text-2xl font-bold text-red-700">{metrics.riskMetrics.overduePayments}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-900">Default Risk</p>
              <p className="text-2xl font-bold text-yellow-700">{metrics.riskMetrics.defaultRisk}%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-orange-900">Open Disputes</p>
              <p className="text-2xl font-bold text-orange-700">{metrics.riskMetrics.disputesOpen}</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Priority Alerts and Recent Activity */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="p-0 overflow-hidden xl:col-span-2">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Priority Alerts</h3>
                <p className="text-xs text-muted">
                  Urgent issues requiring immediate attention
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted">Live</span>
              </div>
            </div>
          </div>
          <ul className="divide-y divide-border max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <li key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                      <span className="text-xs text-muted">{formatTimeAgo(alert.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.priority === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : alert.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {alert.priority} priority
                      </span>
                      <Button size="sm" variant="secondary">
                        {alert.actionLabel}
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Recent Activity</h3>
            <a href="/admin/activity" className="text-xs text-brand-600 hover:text-brand-700">
              View all
            </a>
          </div>
          <ul className="space-y-3 text-sm max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900">{activity.description}</p>
                  {activity.amount && (
                    <p className="text-brand-600 font-medium">
                      {formatCurrency(activity.amount)}
                    </p>
                  )}
                  <p className="text-xs text-muted">{formatTimeAgo(activity.timestamp)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

export default AdminDashboard;

"use client";

import * as React from "react";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

interface MemberMetrics {
  totalContributions: {
    value: number;
    monthlyGrowth: number;
    currency: string;
  };
  activeGroups: {
    count: number;
    nextPayoutDays: number;
  };
  nextPayment: {
    amount: number;
    daysUntilDue: number;
    groupName: string;
  };
  savingsGoals: {
    current: number;
    target: number;
    completionPercentage: number;
  };
}

interface PaymentItem {
  id: string;
  groupName: string;
  amount: number;
  dueDate: Date;
  status: "due" | "upcoming" | "overdue";
}

interface GroupItem {
  id: string;
  name: string;
  status: "on_track" | "behind" | "completed";
  collectionPercentage: number;
  cyclesRemaining?: number;
  nextPayout?: Date;
}

export function MemberDashboard() {
  // Mock data - in real implementation, this would come from API
  const [metrics] = React.useState<MemberMetrics>({
    totalContributions: { value: 1240, monthlyGrowth: 3, currency: "USD" },
    activeGroups: { count: 3, nextPayoutDays: 12 },
    nextPayment: { amount: 100, daysUntilDue: 2, groupName: "Group A" },
    savingsGoals: { current: 1240, target: 5000, completionPercentage: 24.8 }
  });

  const [upcomingPayments] = React.useState<PaymentItem[]>([
    {
      id: "1",
      groupName: "Group A",
      amount: 100,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: "due"
    },
    {
      id: "2",
      groupName: "Group C",
      amount: 50,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "upcoming"
    },
    {
      id: "3",
      groupName: "Group B",
      amount: 75,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: "upcoming"
    }
  ]);

  const [activeGroups] = React.useState<GroupItem[]>([
    {
      id: "1",
      name: "Group A",
      status: "on_track",
      collectionPercentage: 100,
      cyclesRemaining: 8,
      nextPayout: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      name: "Group B",
      status: "behind",
      collectionPercentage: 80,
      cyclesRemaining: 5
    },
    {
      id: "3",
      name: "Group C",
      status: "on_track",
      collectionPercentage: 95,
      cyclesRemaining: 2
    }
  ]);

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDaysUntil = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Tomorrow";
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days overdue`;
    return `${diffInDays} days`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "text-green-600";
      case "behind":
        return "text-yellow-600";
      case "overdue":
        return "text-red-600";
      case "completed":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (group: GroupItem) => {
    if (group.status === "on_track") {
      return group.cyclesRemaining ? `${group.cyclesRemaining} cycles left` : "On track";
    }
    if (group.status === "behind") {
      return `${group.collectionPercentage}% collected`;
    }
    return group.status.replace("_", " ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-muted mt-1">
            Here's your savings and payments at a glance
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Quick Pay
          </Button>
          <Button variant="secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Groups
          </Button>
        </div>
      </header>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-muted">Total contributions</p>
          <p className="text-2xl font-semibold mt-1">
            {formatCurrency(metrics.totalContributions.value)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            +{metrics.totalContributions.monthlyGrowth}% this month
          </p>
        </Card>
        
        <Card>
          <p className="text-xs text-muted">Active groups</p>
          <p className="text-2xl font-semibold mt-1">{metrics.activeGroups.count}</p>
          <p className="text-xs mt-1">Next payout in {metrics.activeGroups.nextPayoutDays} days</p>
        </Card>
        
        <Card>
          <p className="text-xs text-muted">Next due payment</p>
          <p className="text-2xl font-semibold mt-1">
            {formatCurrency(metrics.nextPayment.amount)}
          </p>
          <p className="text-xs mt-1">
            Due in {metrics.nextPayment.daysUntilDue} days - {metrics.nextPayment.groupName}
          </p>
        </Card>
      </section>

      {/* Savings Goal Progress */}
      <section>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">Savings Goal Progress</h3>
              <p className="text-xs text-muted">Track your financial milestones</p>
            </div>
            <Button size="sm" variant="ghost">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Edit Goal
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{formatCurrency(metrics.savingsGoals.current)}</span>
              <span>{formatCurrency(metrics.savingsGoals.target)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-brand-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${metrics.savingsGoals.completionPercentage}%` }}
              ></div>
            </div>
            <div className="text-center">
              <span className="text-lg font-semibold text-brand-600">
                {metrics.savingsGoals.completionPercentage.toFixed(1)}%
              </span>
              <span className="text-sm text-muted ml-1">completed</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Upcoming Payments and Active Groups */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Upcoming payments</h3>
            <a href="/member/payments/calendar" className="text-xs text-brand-600 hover:text-brand-700">
              View calendar
            </a>
          </div>
          <ul className="space-y-3">
            {upcomingPayments.map((payment) => (
              <li key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{payment.groupName}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'due' 
                        ? 'bg-red-100 text-red-800' 
                        : payment.status === 'overdue'
                        ? 'bg-red-200 text-red-900'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {formatCurrency(payment.amount)} • Due {formatDaysUntil(payment.dueDate)}
                  </div>
                </div>
                <div className="flex gap-2">
                  {payment.status === 'due' ? (
                    <Button size="sm">Pay Now</Button>
                  ) : (
                    <Button size="sm" variant="secondary">Schedule</Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Active groups</h3>
            <a href="/member/groups" className="text-xs text-brand-600 hover:text-brand-700">
              View all
            </a>
          </div>
          <ul className="space-y-3">
            {activeGroups.map((group) => (
              <li key={group.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{group.name}</span>
                  <span className={`text-sm ${getStatusColor(group.status)}`}>
                    {getStatusText(group)}
                  </span>
                </div>
                {group.collectionPercentage < 100 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Collection Progress</span>
                      <span>{group.collectionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          group.collectionPercentage >= 90 ? 'bg-green-500' :
                          group.collectionPercentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${group.collectionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {group.nextPayout && (
                  <div className="mt-2 text-xs text-gray-600">
                    Next payout: {formatDaysUntil(group.nextPayout)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

export default MemberDashboard;

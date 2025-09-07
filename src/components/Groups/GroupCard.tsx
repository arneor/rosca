"use client";

import * as React from "react";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

interface GroupMember {
  id: string;
  name: string;
  reliabilityScore: number;
  paymentStatus: "current" | "overdue" | "paid";
}

interface GroupCardProps {
  id: string;
  name: string;
  description?: string;
  status: "active" | "paused" | "completed" | "forming";
  memberCount: number;
  maxMembers: number;
  contributionAmount: number;
  collectionRate: number;
  nextPayoutDate?: Date;
  nextPayoutMember?: string;
  riskLevel: "low" | "medium" | "high";
  totalFund: number;
  cyclesCompleted: number;
  totalCycles: number;
  onViewDetails?: () => void;
  onManage?: () => void;
}

export function GroupCard({
  id,
  name,
  description,
  status,
  memberCount,
  maxMembers,
  contributionAmount,
  collectionRate,
  nextPayoutDate,
  nextPayoutMember,
  riskLevel,
  totalFund,
  cyclesCompleted,
  totalCycles,
  onViewDetails,
  onManage
}: GroupCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "forming":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Tomorrow";
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days overdue`;
    return `${diffInDays} days`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{name}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
            {description && (
              <p className="text-sm text-gray-600 mb-2">{description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{memberCount}/{maxMembers} members</span>
              <span>•</span>
              <span>{formatCurrency(contributionAmount)}/member</span>
              <span>•</span>
              <span className={getRiskColor(riskLevel)}>
                {riskLevel} risk
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={onViewDetails}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Button>
            <Button size="sm" variant="secondary" onClick={onManage}>
              Manage
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Collection Rate</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    collectionRate >= 90 ? 'bg-green-500' :
                    collectionRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${collectionRate}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{collectionRate}%</span>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Total Fund</p>
            <p className="text-lg font-semibold mt-1">{formatCurrency(totalFund)}</p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-gray-500">Cycle Progress</p>
            <span className="text-xs text-gray-600">{cyclesCompleted}/{totalCycles}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-brand-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(cyclesCompleted / totalCycles) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Next Payout Info */}
        {nextPayoutDate && nextPayoutMember && status === "active" && (
          <div className="bg-brand-50 border border-brand-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-900">Next Payout</p>
                <p className="text-xs text-brand-700">
                  {nextPayoutMember} • {formatDate(nextPayoutDate)} ({getDaysUntil(nextPayoutDate)})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-200">
          <Button size="sm" variant="ghost" className="flex-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Message
          </Button>
          <Button size="sm" variant="ghost" className="flex-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Reports
          </Button>
          {status === "active" && (
            <Button size="sm" variant="ghost" className="flex-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Remind
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default GroupCard;

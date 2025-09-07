"use client";

import * as React from "react";
import Card from "@/components/Card";

interface ReliabilityMetrics {
  paymentHistory: {
    onTimePayments: number;
    totalPayments: number;
    percentage: number;
  };
  completionRate: {
    completedGroups: number;
    totalGroups: number;
    percentage: number;
  };
  communicationScore: {
    responseRate: number;
    averageResponseTime: number; // in hours
  };
  disputeHistory: {
    totalDisputes: number;
    resolvedFavorably: number;
  };
  referenceValidation: {
    verifiedReferences: number;
    totalReferences: number;
  };
}

interface ReliabilityScoreProps {
  memberId: string;
  memberName: string;
  overallScore: number;
  metrics: ReliabilityMetrics;
  trend: "improving" | "stable" | "declining";
  lastUpdated: Date;
  showDetails?: boolean;
}

export function ReliabilityScore({
  memberId,
  memberName,
  overallScore,
  metrics,
  trend,
  lastUpdated,
  showDetails = false
}: ReliabilityScoreProps) {
  const [showFullDetails, setShowFullDetails] = React.useState(showDetails);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "declining":
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getScoreDescription = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 50) return "Poor";
    return "Very Poor";
  };

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{memberName}</h3>
          <p className="text-sm text-gray-500">Member ID: {memberId}</p>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(overallScore)} ${getScoreColor(overallScore)}`}>
            {overallScore}/100
          </div>
          <p className="text-xs text-gray-500 mt-1">{getScoreDescription(overallScore)}</p>
        </div>
      </div>

      {/* Score Visualization */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Reliability Score</span>
          <div className="flex items-center gap-1">
            {getTrendIcon(trend)}
            <span className="capitalize text-xs">{trend}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              overallScore >= 80 ? 'bg-green-500' :
              overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold text-gray-900">{metrics.paymentHistory.percentage}%</p>
          <p className="text-xs text-gray-500">On-time Payments</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{metrics.completionRate.percentage}%</p>
          <p className="text-xs text-gray-500">Completion Rate</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{metrics.communicationScore.responseRate}%</p>
          <p className="text-xs text-gray-500">Response Rate</p>
        </div>
      </div>

      {/* Toggle Details */}
      <button
        onClick={() => setShowFullDetails(!showFullDetails)}
        className="w-full text-sm text-brand-600 hover:text-brand-700 py-2 border-t border-gray-200"
      >
        {showFullDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {/* Detailed Metrics */}
      {showFullDetails && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          {/* Payment History */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Payment History</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>On-time payments:</span>
                <span>{metrics.paymentHistory.onTimePayments}/{metrics.paymentHistory.totalPayments}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${metrics.paymentHistory.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Group Completion</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed groups:</span>
                <span>{metrics.completionRate.completedGroups}/{metrics.completionRate.totalGroups}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${metrics.completionRate.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Communication Score */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Communication</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Response Rate:</span>
                <span className="ml-2 font-medium">{metrics.communicationScore.responseRate}%</span>
              </div>
              <div>
                <span className="text-gray-500">Avg Response Time:</span>
                <span className="ml-2 font-medium">{metrics.communicationScore.averageResponseTime}h</span>
              </div>
            </div>
          </div>

          {/* Dispute History */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Dispute History</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Disputes:</span>
                <span className="ml-2 font-medium">{metrics.disputeHistory.totalDisputes}</span>
              </div>
              <div>
                <span className="text-gray-500">Resolved Favorably:</span>
                <span className="ml-2 font-medium">{metrics.disputeHistory.resolvedFavorably}</span>
              </div>
            </div>
          </div>

          {/* Reference Validation */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">References</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Verified references:</span>
                <span>{metrics.referenceValidation.verifiedReferences}/{metrics.referenceValidation.totalReferences}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(metrics.referenceValidation.verifiedReferences / metrics.referenceValidation.totalReferences) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
            Last updated: {formatDate(lastUpdated)}
          </div>
        </div>
      )}
    </Card>
  );
}

export default ReliabilityScore;

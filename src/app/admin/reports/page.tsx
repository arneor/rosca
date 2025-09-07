"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AdminNavigation from "@/components/Navigation/AdminNavigation";
import FinancialChart from "@/components/Analytics/FinancialChart";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

interface ReportMetrics {
  totalRevenue: number;
  totalGroups: number;
  totalMembers: number;
  completionRate: number;
  defaultRate: number;
  averageGroupSize: number;
  monthlyGrowth: number;
}

export default function AdminReportsPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = React.useState("6months");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };
  const [selectedReport, setSelectedReport] = React.useState("overview");

  // Mock data - in real implementation, this would come from API
  const [metrics] = React.useState<ReportMetrics>({
    totalRevenue: 156200,
    totalGroups: 45,
    totalMembers: 548,
    completionRate: 87.5,
    defaultRate: 2.3,
    averageGroupSize: 12.2,
    monthlyGrowth: 8.4,
  });

  const revenueData = [
    { label: "Jan", value: 12500 },
    { label: "Feb", value: 15200 },
    { label: "Mar", value: 18900 },
    { label: "Apr", value: 22100 },
    { label: "May", value: 19800 },
    { label: "Jun", value: 25600 },
  ];

  const groupPerformanceData = [
    { label: "Excellent", value: 35 },
    { label: "Good", value: 28 },
    { label: "Average", value: 22 },
    { label: "Poor", value: 15 },
  ];

  const memberGrowthData = [
    { label: "Jan", value: 420 },
    { label: "Feb", value: 445 },
    { label: "Mar", value: 478 },
    { label: "Apr", value: 502 },
    { label: "May", value: 525 },
    { label: "Jun", value: 548 },
  ];

  const riskAnalysisData = [
    { label: "Low Risk", value: 65 },
    { label: "Medium Risk", value: 25 },
    { label: "High Risk", value: 10 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleExportReport = () => {
    // Mock export functionality
    console.log("Exporting report...");
  };

  const handleScheduleReport = () => {
    // Mock schedule functionality
    console.log("Scheduling report...");
  };

  return (
    <div
      style={{ background: "var(--primary-background)", minHeight: "100vh" }}
    >
      <AdminNavigation onLogout={handleLogout} />

      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold">
                  Financial Reports & Analytics
                </h1>
                <p className="text-muted mt-1">
                  Comprehensive insights into platform performance and financial
                  health
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleScheduleReport}>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Schedule Report
                </Button>
                <Button onClick={handleExportReport}>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export Report
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type
                  </label>
                  <select
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option value="overview">Financial Overview</option>
                    <option value="groups">Group Performance</option>
                    <option value="members">Member Analytics</option>
                    <option value="risk">Risk Assessment</option>
                    <option value="compliance">Compliance Report</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option value="1month">Last Month</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="1year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button variant="secondary">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(metrics.totalRevenue)}
                    </p>
                    <p className="text-xs text-green-600">
                      +{metrics.monthlyGrowth}% this month
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Groups</p>
                    <p className="text-2xl font-bold">{metrics.totalGroups}</p>
                    <p className="text-xs text-gray-500">
                      Avg {metrics.averageGroupSize} members
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold">{metrics.totalMembers}</p>
                    <p className="text-xs text-purple-600">Growing steadily</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold">
                      {metrics.completionRate}%
                    </p>
                    <p className="text-xs text-red-600">
                      {metrics.defaultRate}% default rate
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialChart
                title="Revenue Trend"
                subtitle="Monthly revenue over the last 6 months"
                data={revenueData}
                type="line"
                currency={true}
                color="#10B981"
              />

              <FinancialChart
                title="Member Growth"
                subtitle="Total active members over time"
                data={memberGrowthData}
                type="area"
                color="#3B82F6"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialChart
                title="Group Performance Distribution"
                subtitle="Groups categorized by performance rating"
                data={groupPerformanceData}
                type="pie"
                showLegend={true}
              />

              <FinancialChart
                title="Risk Analysis"
                subtitle="Groups distributed by risk level"
                data={riskAnalysisData}
                type="pie"
                showLegend={true}
              />
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-2">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Top Performing Groups
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Festival Savings Circle",
                      members: 12,
                      completion: 100,
                      revenue: 6000,
                    },
                    {
                      name: "Emergency Fund Group",
                      members: 10,
                      completion: 95,
                      revenue: 10000,
                    },
                    {
                      name: "Education Fund",
                      members: 8,
                      completion: 90,
                      revenue: 6000,
                    },
                    {
                      name: "Business Investment",
                      members: 15,
                      completion: 87,
                      revenue: 30000,
                    },
                    {
                      name: "Wedding Savings",
                      members: 12,
                      completion: 85,
                      revenue: 18000,
                    },
                  ].map((group, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {group.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {group.members} members • {group.completion}%
                          completion
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(group.revenue)}
                        </p>
                        <p className="text-xs text-green-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Risk Indicators
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Payment Delays</span>
                      <span className="text-yellow-600">Medium</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Default Risk</span>
                      <span className="text-green-600">Low</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Dispute Rate</span>
                      <span className="text-green-600">Low</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "8%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Member Churn</span>
                      <span className="text-yellow-600">Medium</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">
                    Recommendation
                  </h4>
                  <p className="text-sm text-blue-700">
                    Focus on member retention strategies and implement early
                    warning systems for payment delays.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

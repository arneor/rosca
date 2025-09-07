"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AdminNavigation from "@/components/Navigation/AdminNavigation";
import GroupCard from "@/components/Groups/GroupCard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

interface Group {
  id: string;
  name: string;
  description: string;
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
  createdDate: Date;
}

export default function AdminGroupsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [riskFilter, setRiskFilter] = React.useState<string>("all");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  // Mock data - in real implementation, this would come from API
  const [groups] = React.useState<Group[]>([
    {
      id: "1",
      name: "Festival Savings Circle",
      description: "Save for Diwali celebrations and gifts",
      status: "active",
      memberCount: 12,
      maxMembers: 12,
      contributionAmount: 500,
      collectionRate: 92,
      nextPayoutDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      nextPayoutMember: "Priya Sharma",
      riskLevel: "low",
      totalFund: 6000,
      cyclesCompleted: 3,
      totalCycles: 12,
      createdDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      name: "Emergency Fund Group",
      description: "Building emergency funds for unexpected expenses",
      status: "active",
      memberCount: 8,
      maxMembers: 10,
      contributionAmount: 1000,
      collectionRate: 75,
      nextPayoutDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      nextPayoutMember: "Raj Kumar",
      riskLevel: "medium",
      totalFund: 8000,
      cyclesCompleted: 2,
      totalCycles: 10,
      createdDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: "3",
      name: "Business Investment Circle",
      description: "Funding small business ventures and startups",
      status: "forming",
      memberCount: 6,
      maxMembers: 15,
      contributionAmount: 2000,
      collectionRate: 100,
      riskLevel: "high",
      totalFund: 12000,
      cyclesCompleted: 0,
      totalCycles: 15,
      createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: "4",
      name: "Education Fund",
      description: "Supporting children's education expenses",
      status: "completed",
      memberCount: 10,
      maxMembers: 10,
      contributionAmount: 750,
      collectionRate: 100,
      riskLevel: "low",
      totalFund: 7500,
      cyclesCompleted: 10,
      totalCycles: 10,
      createdDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    },
    {
      id: "5",
      name: "Wedding Savings Group",
      description: "Saving for wedding expenses and celebrations",
      status: "paused",
      memberCount: 8,
      maxMembers: 12,
      contributionAmount: 1500,
      collectionRate: 60,
      riskLevel: "high",
      totalFund: 9000,
      cyclesCompleted: 4,
      totalCycles: 12,
      createdDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000)
    }
  ]);

  const filteredGroups = React.useMemo(() => {
    return groups.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          group.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || group.status === statusFilter;
      const matchesRisk = riskFilter === "all" || group.riskLevel === riskFilter;
      
      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [groups, searchTerm, statusFilter, riskFilter]);

  const getStatusCounts = () => {
    return {
      all: groups.length,
      active: groups.filter(g => g.status === "active").length,
      forming: groups.filter(g => g.status === "forming").length,
      paused: groups.filter(g => g.status === "paused").length,
      completed: groups.filter(g => g.status === "completed").length
    };
  };

  const statusCounts = getStatusCounts();

  const handleViewDetails = (groupId: string) => {
    // Navigate to group details page
    console.log("View details for group:", groupId);
  };

  const handleManageGroup = (groupId: string) => {
    // Navigate to group management page
    console.log("Manage group:", groupId);
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
            <h1 className="text-2xl font-semibold">Group Management</h1>
            <p className="text-muted mt-1">
              Manage all ROSCA groups, monitor performance, and handle member activities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Data
            </Button>
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Group
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search groups by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="all">All Status ({statusCounts.all})</option>
                <option value="active">Active ({statusCounts.active})</option>
                <option value="forming">Forming ({statusCounts.forming})</option>
                <option value="paused">Paused ({statusCounts.paused})</option>
                <option value="completed">Completed ({statusCounts.completed})</option>
              </select>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
              <p className="text-xs text-gray-500">Total Groups</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{statusCounts.forming}</p>
              <p className="text-xs text-gray-500">Forming</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.paused}</p>
              <p className="text-xs text-gray-500">Paused</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.completed}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              {...group}
              onViewDetails={() => handleViewDetails(group.id)}
              onManage={() => handleManageGroup(group.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== "all" || riskFilter !== "all" 
                ? "Try adjusting your search criteria or filters."
                : "Get started by creating your first ROSCA group."
              }
            </p>
            {(!searchTerm && statusFilter === "all" && riskFilter === "all") && (
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create First Group
              </Button>
            )}
          </div>
        )}
          </div>
        </div>
      </main>
    </div>
  );
}

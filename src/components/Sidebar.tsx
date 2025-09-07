"use client";

import * as React from "react";
import Link from "next/link";
import { Navigation } from "./Navigation";
import { Button } from "./Button";

interface SidebarProps {
  userRole: "admin" | "member";
  userName?: string;
  onLogout?: () => void;
}

// Admin Navigation Items
const adminNavigationItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      </svg>
    ),
    subItems: [
      { label: "Overview", href: "/admin/dashboard/overview" },
      { label: "Analytics", href: "/admin/dashboard/analytics" },
      { label: "Alerts", href: "/admin/dashboard/alerts" }
    ]
  },
  {
    label: "Groups",
    href: "/admin/groups",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    subItems: [
      { label: "All Groups", href: "/admin/groups/all" },
      { label: "Create Group", href: "/admin/groups/create" },
      { label: "Group Reports", href: "/admin/groups/reports" }
    ]
  },
  {
    label: "Members",
    href: "/admin/members",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    subItems: [
      { label: "All Members", href: "/admin/members/all" },
      { label: "Add Member", href: "/admin/members/create" },
      { label: "Bulk Import", href: "/admin/members/bulk-import" },
      { label: "Reliability Scores", href: "/admin/members/scores" }
    ]
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    subItems: [
      { label: "Collection Status", href: "/admin/payments/collections" },
      { label: "Payout Management", href: "/admin/payments/payouts" },
      { label: "Overdue Tracking", href: "/admin/payments/overdue" },
      { label: "Payment Disputes", href: "/admin/payments/disputes" },
      { label: "Transaction History", href: "/admin/payments/history" }
    ]
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    subItems: [
      { label: "Financial Reports", href: "/admin/reports/financial" },
      { label: "Member Analytics", href: "/admin/reports/members" },
      { label: "Group Performance", href: "/admin/reports/groups" },
      { label: "Custom Reports", href: "/admin/reports/custom" },
      { label: "Export Center", href: "/admin/reports/exports" }
    ]
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    subItems: [
      { label: "Platform Settings", href: "/admin/settings/platform" },
      { label: "User Management", href: "/admin/settings/users" },
      { label: "Security Settings", href: "/admin/settings/security" },
      { label: "Notifications", href: "/admin/settings/notifications" },
      { label: "Integrations", href: "/admin/settings/integrations" }
    ]
  }
];

// Member Navigation Items
const memberNavigationItems = [
  {
    label: "Dashboard",
    href: "/member/dashboard",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      </svg>
    ),
    subItems: [
      { label: "Overview", href: "/member/dashboard/overview" },
      { label: "Savings Goals", href: "/member/dashboard/goals" },
      { label: "Achievements", href: "/member/dashboard/achievements" }
    ]
  },
  {
    label: "My Groups",
    href: "/member/groups",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    subItems: [
      { label: "Active Groups", href: "/member/groups/active" },
      { label: "Completed Groups", href: "/member/groups/completed" }
    ]
  },
  {
    label: "Payments",
    href: "/member/payments",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    subItems: [
      { label: "Make Payment", href: "/member/payments/pay" },
      { label: "Payment History", href: "/member/payments/history" },
      { label: "Payment Methods", href: "/member/payments/methods" },
      { label: "Auto-Pay Setup", href: "/member/payments/autopay" },
      { label: "Payment Calendar", href: "/member/payments/calendar" }
    ]
  },
  {
    label: "Discover Groups",
    href: "/member/discover",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    subItems: [
      { label: "Browse Groups", href: "/member/discover/browse" },
      { label: "Recommended", href: "/member/discover/recommended" },
      { label: "Invitations", href: "/member/discover/invitations" },
      { label: "Join Requests", href: "/member/discover/requests" }
    ]
  },
  {
    label: "Profile",
    href: "/member/profile",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    subItems: [
      { label: "Personal Info", href: "/member/profile/info" },
      { label: "Financial Goals", href: "/member/profile/goals" },
      { label: "Notifications", href: "/member/profile/notifications" },
      { label: "Privacy Settings", href: "/member/profile/privacy" },
      { label: "Account Security", href: "/member/profile/security" }
    ]
  }
];

export function Sidebar({ userRole, userName = "User", onLogout }: SidebarProps) {
  const navigationItems = userRole === "admin" ? adminNavigationItems : memberNavigationItems;

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo and Brand */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href={`/${userRole}/dashboard`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-semibold text-gray-900">ROSCA</span>
        </Link>
        <div className="text-xs text-gray-500 capitalize">{userRole}</div>
      </div>

      {/* Navigation */}
      <Navigation items={navigationItems} userRole={userRole} />

      {/* Quick Actions */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="space-y-2">
          {userRole === "admin" ? (
            <>
              <Button size="sm" className="w-full justify-start" variant="secondary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Group
              </Button>
              <Button size="sm" className="w-full justify-start" variant="ghost">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Add Member
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" className="w-full justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Quick Pay
              </Button>
              <Button size="sm" className="w-full justify-start" variant="ghost">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Groups
              </Button>
            </>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
          <button
            onClick={onLogout}
            className="p-1 hover:bg-gray-100 rounded"
            title="Logout"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

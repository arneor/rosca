"use client";

import * as React from "react";
import { Button } from "@/components/Button";

interface LayoutProps {
  userRole: "admin" | "member";
  userName: string;
  children: React.ReactNode;
}

export default function Layout({ userRole, userName, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Debug: Log sidebar state
  React.useEffect(() => {
    console.log('Sidebar state:', sidebarOpen);
  }, [sidebarOpen]);

  const navigation = userRole === "admin" 
    ? [
        { name: "Dashboard", href: "/admin", icon: "📊" },
        { name: "Groups", href: "/admin/groups", icon: "👥" },
        { name: "Members", href: "/admin/members", icon: "👤" },
        { name: "Payments", href: "/admin/payments", icon: "💳" },
        { name: "Reports", href: "/admin/reports", icon: "📈" },
        { name: "Settings", href: "/admin/settings", icon: "⚙️" },
      ]
    : [
        { name: "Dashboard", href: "/member", icon: "🏠" },
        { name: "My Groups", href: "/member/groups", icon: "👥" },
        { name: "Payments", href: "/member/payments", icon: "💳" },
        { name: "History", href: "/member/history", icon: "📋" },
        { name: "Profile", href: "/member/profile", icon: "👤" },
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile sidebar overlay - Always render but control visibility */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex h-full flex-col bg-white border-r border-gray-200 shadow-xl" style={{ backgroundColor: '#ffffff' }}>
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 bg-white" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-blue-500 shadow-md">
                <span className="text-lg font-bold text-white">R</span>
              </div>
              <span className="text-lg font-semibold text-gray-900" style={{ color: '#111827' }}>ROSCA</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
              style={{ color: '#6B7280' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 bg-white" style={{ backgroundColor: '#ffffff' }}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                style={{ color: '#4B5563' }}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>

          {/* User info */}
          <div className="border-t border-gray-200 p-4 bg-white" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-blue-500 shadow-sm">
                <span className="text-sm font-semibold text-white">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate" style={{ color: '#111827' }}>
                  {userName}
                </p>
                <p className="text-xs text-gray-500 capitalize" style={{ color: '#6B7280' }}>
                  {userRole}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-3 text-xs"
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100">
              🔔
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </button>
            
            {/* Quick actions */}
            <div className="hidden sm:flex items-center space-x-2">
              {userRole === "admin" ? (
                <>
                  <Button size="sm" variant="secondary">Add Member</Button>
                  <Button size="sm">Create Group</Button>
                </>
              ) : (
                <Button size="sm">Make Payment</Button>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
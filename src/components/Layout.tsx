"use client";

import * as React from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  userRole: "admin" | "member";
  userName?: string;
  showSidebar?: boolean;
}

export function Layout({ 
  children, 
  userRole, 
  userName = "User", 
  showSidebar = true 
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  if (!showSidebar) {
    return <main className="min-h-screen bg-gray-50">{children}</main>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          userRole={userRole} 
          userName={userName} 
          onLogout={handleLogout}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="font-semibold text-gray-900">ROSCA</span>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

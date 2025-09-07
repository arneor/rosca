"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AdminNavigation from "@/components/Navigation/AdminNavigation";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  const [dashboardData] = React.useState({
    totalMembers: 1247,
    activeGroups: 89,
    totalFunds: 12500000,
    monthlyVolume: 2800000,
    pendingApprovals: 15,
    riskAlerts: 3,
    systemHealth: 98.5,
    avgTrustScore: 91.2
  });

  return (
    <div style={{ background: 'var(--primary-background)', minHeight: '100vh' }}>
      <AdminNavigation onLogout={handleLogout} />
      
      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ 
              color: 'var(--primary-text)',
              fontFamily: 'var(--font-display)'
            }}>
              Admin Dashboard
            </h1>
            <p style={{ color: 'var(--secondary-text)' }}>
              Monitor and manage the ROSCA platform
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Total Members</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--accent-blue)' }}>
                    {dashboardData.totalMembers.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)'
                }}>
                  <span className="text-xl">👥</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Active Groups</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--success-green)' }}>
                    {dashboardData.activeGroups}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #059669, #06B6D4)'
                }}>
                  <span className="text-xl">🏦</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Total Funds</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--premium-gold)' }}>
                    ₹{(dashboardData.totalFunds / 10000000).toFixed(1)}Cr
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #F59E0B, #EF4444)'
                }}>
                  <span className="text-xl">💰</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>System Health</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--success-green)' }}>
                    {dashboardData.systemHealth}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #059669, #0EA5E9)'
                }}>
                  <span className="text-xl">⚡</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Alerts & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="glass-card p-6" style={{
              border: '2px solid var(--warning-amber)',
              background: 'rgba(245, 158, 11, 0.1)'
            }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--primary-text)' }}>
                Pending Approvals
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" style={{ color: 'var(--warning-amber)' }}>
                    {dashboardData.pendingApprovals}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
                    Groups awaiting approval
                  </p>
                </div>
                <Button size="sm">Review</Button>
              </div>
            </Card>

            <Card className="glass-card p-6" style={{
              border: '2px solid var(--error-red)',
              background: 'rgba(239, 68, 68, 0.1)'
            }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--primary-text)' }}>
                Risk Alerts
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" style={{ color: 'var(--error-red)' }}>
                    {dashboardData.riskAlerts}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
                    High-risk situations
                  </p>
                </div>
                <Button variant="danger" size="sm">Investigate</Button>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--primary-text)' }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button variant="secondary" size="sm" className="w-full">
                  Create Group
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  Add Member
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  Generate Report
                </Button>
              </div>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary-text)' }}>
                Monthly Volume Trend
              </h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const height = Math.random() * 200 + 50;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full rounded-t-lg mb-2 transition-all duration-300 hover:opacity-80 cursor-pointer"
                        style={{
                          height: `${height}px`,
                          background: 'linear-gradient(180deg, #0EA5E9, #3B82F6)',
                          minHeight: '20px'
                        }}
                        title={`Month ${i + 1}: ₹${(height * 1000).toLocaleString()}`}
                      />
                      <span className="text-xs" style={{ color: 'var(--muted-text)' }}>
                        {new Date(2024, i).toLocaleDateString('en', { month: 'short' })}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--secondary-text)' }}>Total Volume</span>
                  <span className="font-semibold" style={{ color: 'var(--accent-blue)' }}>
                    ₹{dashboardData.monthlyVolume.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary-text)' }}>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { action: "New group created: Tech Startup Fund", time: "5 minutes ago", type: "create" },
                  { action: "Payment processed: ₹50,000", time: "12 minutes ago", type: "payment" },
                  { action: "Member verification completed", time: "1 hour ago", type: "verify" },
                  { action: "Risk alert resolved", time: "2 hours ago", type: "resolve" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{
                    background: 'var(--secondary-background)'
                  }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                      background: activity.type === 'create' ? 'var(--success-green)' :
                                 activity.type === 'payment' ? 'var(--financial-blue)' :
                                 activity.type === 'verify' ? 'var(--premium-gold)' : 'var(--info-cyan)'
                    }}>
                      <span className="text-sm">
                        {activity.type === 'create' ? '➕' : 
                         activity.type === 'payment' ? '💳' :
                         activity.type === 'verify' ? '✅' : '🔧'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: 'var(--primary-text)' }}>
                        {activity.action}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--muted-text)' }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

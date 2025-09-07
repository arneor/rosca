"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import MemberNavigation from "@/components/Navigation/MemberNavigation";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function MemberGroupsPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  const [myGroups] = React.useState([
    {
      id: "1",
      name: "Tech Professionals Circle",
      members: 12,
      totalAmount: 60000,
      monthlyContribution: 5000,
      nextPayout: "₹60,000 in 3 months",
      status: "active",
      myPosition: 8,
      completionRate: 67
    },
    {
      id: "2", 
      name: "Festival Savings Group",
      members: 8,
      totalAmount: 40000,
      monthlyContribution: 5000,
      nextPayout: "₹40,000 in 1 month",
      status: "active",
      myPosition: 2,
      completionRate: 88
    },
    {
      id: "3",
      name: "Emergency Fund ROSCA",
      members: 15,
      totalAmount: 75000,
      monthlyContribution: 5000,
      nextPayout: "Completed",
      status: "completed",
      myPosition: 5,
      completionRate: 100
    }
  ]);

  return (
    <div style={{ background: 'var(--primary-background)', minHeight: '100vh' }}>
      <MemberNavigation onLogout={handleLogout} />
      
      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ 
                color: 'var(--primary-text)',
                fontFamily: 'var(--font-display)'
              }}>
                My Groups
              </h1>
              <p style={{ color: 'var(--secondary-text)' }}>
                Manage your ROSCA group participations
              </p>
            </div>
            <Button onClick={() => router.push('/member/discover')}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Join New Group
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card p-6">
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--accent-blue)' }}>
                  {myGroups.length}
                </p>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Total Groups</p>
              </div>
            </Card>
            <Card className="glass-card p-6">
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--success-green)' }}>
                  {myGroups.filter(g => g.status === 'active').length}
                </p>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Active Groups</p>
              </div>
            </Card>
            <Card className="glass-card p-6">
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--premium-gold)' }}>
                  ₹{myGroups.reduce((sum, g) => sum + g.monthlyContribution, 0).toLocaleString()}
                </p>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Monthly Contribution</p>
              </div>
            </Card>
            <Card className="glass-card p-6">
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--info-cyan)' }}>
                  {myGroups.filter(g => g.status === 'completed').length}
                </p>
                <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>Completed</p>
              </div>
            </Card>
          </div>

          {/* Groups List */}
          <div className="space-y-6">
            {myGroups.map((group) => (
              <Card key={group.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-text)' }}>
                        {group.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        group.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {group.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p style={{ color: 'var(--muted-text)' }}>Members</p>
                        <p className="font-semibold" style={{ color: 'var(--primary-text)' }}>
                          {group.members}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted-text)' }}>Total Pool</p>
                        <p className="font-semibold" style={{ color: 'var(--success-green)' }}>
                          ₹{group.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted-text)' }}>My Position</p>
                        <p className="font-semibold" style={{ color: 'var(--accent-blue)' }}>
                          #{group.myPosition}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted-text)' }}>Next Payout</p>
                        <p className="font-semibold" style={{ color: 'var(--premium-gold)' }}>
                          {group.nextPayout}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                    {group.status === 'active' && (
                      <Button size="sm">
                        Make Payment
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: 'var(--secondary-text)' }}>Completion Progress</span>
                    <span style={{ color: 'var(--accent-blue)' }}>{group.completionRate}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: 'var(--secondary-background)' }}>
                    <div 
                      className="h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${group.completionRate}%`,
                        background: group.status === 'completed' 
                          ? 'linear-gradient(90deg, var(--success-green), var(--info-cyan))'
                          : 'linear-gradient(90deg, var(--financial-blue), var(--accent-blue))'
                      }}
                    />
                  </div>
                </div>

                {/* Member Avatars */}
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: 'var(--muted-text)' }}>Members:</span>
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(group.members, 6) }).map((_, i) => (
                      <div 
                        key={i}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold"
                        style={{
                          background: `linear-gradient(135deg, var(--accent-blue), var(--financial-blue))`,
                          borderColor: 'var(--primary-background)',
                          color: 'var(--primary-text)'
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                    {group.members > 6 && (
                      <div 
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold"
                        style={{
                          background: 'var(--muted-text)',
                          borderColor: 'var(--primary-background)',
                          color: 'var(--primary-text)'
                        }}
                      >
                        +{group.members - 6}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State for no groups */}
          {myGroups.length === 0 && (
            <Card className="glass-card p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
                background: 'var(--secondary-background)'
              }}>
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-text)' }}>
                No Groups Yet
              </h3>
              <p className="mb-6" style={{ color: 'var(--secondary-text)' }}>
                Join your first ROSCA group to start saving together
              </p>
              <Button onClick={() => router.push('/member/discover')}>
                Discover Groups
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

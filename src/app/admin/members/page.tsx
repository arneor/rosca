"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AdminNavigation from "@/components/Navigation/AdminNavigation";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function AdminMembersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  const [members] = React.useState([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya@email.com",
      phone: "+91 98765 43210",
      trustScore: 92,
      activeGroups: 3,
      totalSavings: 45000,
      joinedDate: "2023-03-15",
      status: "active",
      riskLevel: "low"
    },
    {
      id: "2", 
      name: "Rajesh Kumar",
      email: "rajesh@email.com",
      phone: "+91 87654 32109",
      trustScore: 88,
      activeGroups: 2,
      totalSavings: 32000,
      joinedDate: "2023-01-20",
      status: "active",
      riskLevel: "low"
    },
    {
      id: "3",
      name: "Amit Singh",
      email: "amit@email.com", 
      phone: "+91 76543 21098",
      trustScore: 75,
      activeGroups: 1,
      totalSavings: 15000,
      joinedDate: "2023-06-10",
      status: "warning",
      riskLevel: "medium"
    }
  ]);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--primary-background)', minHeight: '100vh' }}>
      <AdminNavigation onLogout={handleLogout} />
      
      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ 
                color: 'var(--primary-text)',
                fontFamily: 'var(--font-display)'
              }}>
                Member Management
              </h1>
              <p style={{ color: 'var(--secondary-text)' }}>
                Monitor and manage platform members
              </p>
            </div>
            <Button>Add New Member</Button>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>

          <Card className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ background: 'var(--secondary-background)' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--secondary-text)' }}>
                      Member
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--secondary-text)' }}>
                      Trust Score
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--secondary-text)' }}>
                      Active Groups
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--secondary-text)' }}>
                      Total Savings
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--secondary-text)' }}>
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: 'var(--secondary-text)' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-opacity-50" style={{ 
                      background: 'transparent'
                    }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                            background: 'linear-gradient(135deg, var(--accent-blue), var(--financial-blue))'
                          }}>
                            <span className="font-semibold text-sm" style={{ color: 'var(--primary-text)' }}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: 'var(--primary-text)' }}>
                              {member.name}
                            </p>
                            <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold" style={{ 
                            color: member.trustScore >= 90 ? 'var(--success-green)' : 
                                   member.trustScore >= 80 ? 'var(--premium-gold)' : 'var(--warning-amber)'
                          }}>
                            {member.trustScore}%
                          </span>
                          <div className="w-16 h-2 rounded-full" style={{ background: 'var(--secondary-background)' }}>
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${member.trustScore}%`,
                                background: member.trustScore >= 90 ? 'var(--success-green)' : 
                                           member.trustScore >= 80 ? 'var(--premium-gold)' : 'var(--warning-amber)'
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium" style={{ color: 'var(--accent-blue)' }}>
                          {member.activeGroups}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium" style={{ color: 'var(--success-green)' }}>
                          ₹{member.totalSavings.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === 'active' ? 'bg-green-100 text-green-800' :
                          member.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

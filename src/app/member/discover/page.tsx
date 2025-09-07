"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import MemberNavigation from "@/components/Navigation/MemberNavigation";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function MemberDiscoverPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  const categories = [
    { id: "all", name: "All Groups", count: 24 },
    { id: "tech", name: "Technology", count: 8 },
    { id: "business", name: "Business", count: 6 },
    { id: "personal", name: "Personal", count: 5 },
    { id: "emergency", name: "Emergency", count: 3 },
    { id: "festival", name: "Festival", count: 2 }
  ];

  const [availableGroups] = React.useState([
    {
      id: "1",
      name: "Startup Founders Circle",
      category: "business",
      description: "Monthly savings for business expansion and emergency funds",
      members: 8,
      maxMembers: 12,
      monthlyAmount: 10000,
      duration: 12,
      trustScore: 95,
      adminName: "Rajesh Kumar",
      adminRating: 4.8,
      nextStart: "Starting in 5 days",
      tags: ["Business", "High Amount", "Verified Admin"]
    },
    {
      id: "2",
      name: "Women Entrepreneurs Fund",
      category: "business", 
      description: "Supporting women-led businesses with collective savings",
      members: 15,
      maxMembers: 20,
      monthlyAmount: 5000,
      duration: 10,
      trustScore: 98,
      adminName: "Priya Patel",
      adminRating: 4.9,
      nextStart: "Starting next month",
      tags: ["Women Only", "Business", "High Trust"]
    },
    {
      id: "3",
      name: "Tech Professionals Savings",
      category: "tech",
      description: "IT professionals saving for gadgets and skill development",
      members: 10,
      maxMembers: 15,
      monthlyAmount: 7500,
      duration: 8,
      trustScore: 92,
      adminName: "Amit Singh",
      adminRating: 4.7,
      nextStart: "Open for joining",
      tags: ["Tech", "Skill Development", "Flexible"]
    },
    {
      id: "4",
      name: "Festival Celebration Fund",
      category: "festival",
      description: "Save together for grand festival celebrations",
      members: 12,
      maxMembers: 25,
      monthlyAmount: 3000,
      duration: 6,
      trustScore: 89,
      adminName: "Meera Sharma",
      adminRating: 4.6,
      nextStart: "Starting in 2 weeks",
      tags: ["Festival", "Community", "Low Amount"]
    },
    {
      id: "5",
      name: "Emergency Support Network",
      category: "emergency",
      description: "Quick access fund for medical and family emergencies",
      members: 18,
      maxMembers: 30,
      monthlyAmount: 2000,
      duration: 12,
      trustScore: 96,
      adminName: "Dr. Suresh Reddy",
      adminRating: 4.9,
      nextStart: "Always open",
      tags: ["Emergency", "Medical", "Community Support"]
    }
  ]);

  const filteredGroups = availableGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTrustScoreColor = (score: number) => {
    if (score >= 95) return 'var(--success-green)';
    if (score >= 90) return 'var(--premium-gold)';
    if (score >= 85) return 'var(--warning-amber)';
    return 'var(--error-red)';
  };

  return (
    <div style={{ background: 'var(--primary-background)', minHeight: '100vh' }}>
      <MemberNavigation onLogout={handleLogout} />
      
      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ 
              color: 'var(--primary-text)',
              fontFamily: 'var(--font-display)'
            }}>
              Discover Groups
            </h1>
            <p style={{ color: 'var(--secondary-text)' }}>
              Find and join trusted ROSCA groups that match your savings goals
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search groups by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
              <Button variant="secondary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id ? 'shadow-md' : ''
                  }`}
                  style={{
                    background: selectedCategory === category.id 
                      ? 'linear-gradient(135deg, var(--financial-blue), var(--accent-blue))'
                      : 'var(--card-background)',
                    color: selectedCategory === category.id 
                      ? 'var(--primary-text)'
                      : 'var(--secondary-text)',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="glass-card p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-text)' }}>
                      {group.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--secondary-text)' }}>
                      {group.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm font-semibold" style={{ color: getTrustScoreColor(group.trustScore) }}>
                        {group.trustScore}%
                      </span>
                      <span className="text-xs" style={{ color: 'var(--muted-text)' }}>Trust</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">⭐</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--premium-gold)' }}>
                        {group.adminRating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Group Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-4 rounded-lg" style={{ background: 'var(--secondary-background)' }}>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted-text)' }}>Monthly Amount</p>
                    <p className="font-semibold" style={{ color: 'var(--success-green)' }}>
                      ₹{group.monthlyAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted-text)' }}>Duration</p>
                    <p className="font-semibold" style={{ color: 'var(--accent-blue)' }}>
                      {group.duration} months
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted-text)' }}>Members</p>
                    <p className="font-semibold" style={{ color: 'var(--info-cyan)' }}>
                      {group.members}/{group.maxMembers}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted-text)' }}>Admin</p>
                    <p className="font-semibold text-xs" style={{ color: 'var(--primary-text)' }}>
                      {group.adminName}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'var(--glass-background)',
                        color: 'var(--accent-text)',
                        border: '1px solid var(--glass-border)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Status and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--premium-gold)' }}>
                      {group.nextStart}
                    </p>
                    <div className="w-full h-1 rounded-full mt-1" style={{ background: 'var(--secondary-background)' }}>
                      <div 
                        className="h-1 rounded-full" 
                        style={{ 
                          width: `${(group.members / group.maxMembers) * 100}%`,
                          background: 'linear-gradient(90deg, var(--success-green), var(--info-cyan))'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">
                      Join Group
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredGroups.length === 0 && (
            <Card className="glass-card p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
                background: 'var(--secondary-background)'
              }}>
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-text)' }}>
                No Groups Found
              </h3>
              <p className="mb-6" style={{ color: 'var(--secondary-text)' }}>
                Try adjusting your search terms or category filters
              </p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import MemberNavigation from "@/components/Navigation/MemberNavigation";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function MemberProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  const [profile, setProfile] = React.useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    address: "123 Tech Park, Bangalore, Karnataka 560001",
    occupation: "Software Engineer",
    monthlyIncome: "₹85,000",
    trustScore: 92,
    joinedDate: "March 2023",
    totalSavings: "₹45,000",
    completedGroups: 8,
    activeGroups: 3
  });

  return (
    <div style={{ background: 'var(--primary-background)', minHeight: '100vh' }}>
      <MemberNavigation onLogout={handleLogout} />
      
      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ 
                color: 'var(--primary-text)',
                fontFamily: 'var(--font-display)'
              }}>
                My Profile
              </h1>
              <p style={{ color: 'var(--secondary-text)' }}>
                Manage your personal information and preferences
              </p>
            </div>
            <Button 
              variant={isEditing ? "secondary" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="glass-card p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, var(--premium-gold), var(--warning-amber))'
                }}>
                  <span className="text-3xl font-bold" style={{ color: 'var(--primary-text)' }}>
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-text)' }}>
                  {profile.name}
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--secondary-text)' }}>
                  {profile.occupation}
                </p>
                
                {/* Trust Score */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold" style={{ color: 'var(--premium-gold)' }}>
                      {profile.trustScore}%
                    </span>
                    <span className="text-sm" style={{ color: 'var(--muted-text)' }}>Trust Score</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: 'var(--secondary-background)' }}>
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${profile.trustScore}%`,
                        background: 'linear-gradient(90deg, var(--premium-gold), var(--success-green))'
                      }}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg" style={{ background: 'var(--secondary-background)' }}>
                    <p style={{ color: 'var(--muted-text)' }}>Total Savings</p>
                    <p className="font-semibold" style={{ color: 'var(--success-green)' }}>
                      {profile.totalSavings}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: 'var(--secondary-background)' }}>
                    <p style={{ color: 'var(--muted-text)' }}>Active Groups</p>
                    <p className="font-semibold" style={{ color: 'var(--accent-blue)' }}>
                      {profile.activeGroups}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-text)' }}>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                  <Input
                    label="Phone Number"
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                  <Input
                    label="Occupation"
                    value={profile.occupation}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    label="Address"
                    value={profile.address}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>
              </Card>

              {/* Financial Information */}
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-text)' }}>
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Monthly Income"
                    value={profile.monthlyIncome}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, monthlyIncome: e.target.value})}
                  />
                  <div>
                    <label className="text-sm" style={{ color: 'var(--secondary-text)' }}>
                      Member Since
                    </label>
                    <p className="mt-1 p-3 rounded-lg" style={{ 
                      background: 'var(--secondary-background)',
                      color: 'var(--primary-text)'
                    }}>
                      {profile.joinedDate}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Account Statistics */}
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-text)' }}>
                  Account Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-lg" style={{ background: 'var(--secondary-background)' }}>
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{
                      background: 'var(--success-green)'
                    }}>
                      <span className="text-xl">✅</span>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--success-green)' }}>
                      {profile.completedGroups}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Completed Groups</p>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ background: 'var(--secondary-background)' }}>
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{
                      background: 'var(--accent-blue)'
                    }}>
                      <span className="text-xl">👥</span>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--accent-blue)' }}>
                      {profile.activeGroups}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Active Groups</p>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ background: 'var(--secondary-background)' }}>
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{
                      background: 'var(--premium-gold)'
                    }}>
                      <span className="text-xl">⭐</span>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--premium-gold)' }}>
                      {profile.trustScore}%
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Trust Score</p>
                  </div>
                </div>
              </Card>

              {/* Save Changes */}
              {isEditing && (
                <div className="flex gap-4">
                  <Button onClick={() => setIsEditing(false)}>
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

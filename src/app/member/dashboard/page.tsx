"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import MemberNavigation from "@/components/Navigation/MemberNavigation";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function MemberDashboard() {
  const router = useRouter();
  const [memberData, setMemberData] = React.useState({
    name: "Priya Sharma",
    totalSavings: 45000,
    activeGroups: 3,
    nextPayment: "₹5,000 due in 3 days",
    reliabilityScore: 92,
    completedCycles: 8,
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  return (
    <div
      style={{ background: "var(--primary-background)", minHeight: "100vh" }}
    >
      <MemberNavigation onLogout={handleLogout} />

      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                color: "var(--primary-text)",
                fontFamily: "var(--font-display)",
              }}
            >
              Welcome back, {memberData.name}
            </h1>
            <p style={{ color: "var(--secondary-text)" }}>
              Your financial journey continues with trust and transparency
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--secondary-text)" }}
                  >
                    Total Savings
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--success-green)" }}
                  >
                    ₹{memberData.totalSavings.toLocaleString()}
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--success-green), var(--info-cyan))",
                  }}
                >
                  <span className="text-xl">💰</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--secondary-text)" }}
                  >
                    Active Groups
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {memberData.activeGroups}
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-blue), var(--financial-blue))",
                  }}
                >
                  <span className="text-xl">👥</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--secondary-text)" }}
                  >
                    Reliability Score
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--premium-gold)" }}
                  >
                    {memberData.reliabilityScore}%
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--premium-gold), var(--warning-amber))",
                  }}
                >
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--secondary-text)" }}
                  >
                    Completed Cycles
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--info-cyan)" }}
                  >
                    {memberData.completedCycles}
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--info-cyan), var(--success-green))",
                  }}
                >
                  <span className="text-xl">🏆</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Next Payment Alert */}
          <Card
            className="glass-card p-6 mb-8"
            style={{
              border: "2px solid var(--warning-amber)",
              background: "rgba(245, 158, 11, 0.1)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: "var(--warning-amber)",
                  }}
                >
                  <span className="text-xl">⏰</span>
                </div>
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--primary-text)" }}
                  >
                    Upcoming Payment
                  </h3>
                  <p style={{ color: "var(--secondary-text)" }}>
                    {memberData.nextPayment}
                  </p>
                </div>
              </div>
              <Button variant="primary">Pay Now</Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card p-6">
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--primary-text)" }}
              >
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: "Payment made to Tech Professionals Group",
                    amount: "₹5,000",
                    time: "2 hours ago",
                    type: "payment",
                  },
                  {
                    action: "Received payout from Marketing Team ROSCA",
                    amount: "₹25,000",
                    time: "1 day ago",
                    type: "payout",
                  },
                  {
                    action: "Joined new group: Startup Founders",
                    amount: "",
                    time: "3 days ago",
                    type: "join",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{
                      background: "var(--secondary-background)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            activity.type === "payment"
                              ? "var(--error-red)"
                              : activity.type === "payout"
                              ? "var(--success-green)"
                              : "var(--info-cyan)",
                        }}
                      >
                        <span className="text-sm">
                          {activity.type === "payment"
                            ? "↗️"
                            : activity.type === "payout"
                            ? "↙️"
                            : "👋"}
                        </span>
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--primary-text)" }}
                        >
                          {activity.action}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--muted-text)" }}
                        >
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    {activity.amount && (
                      <span
                        className="font-semibold"
                        style={{
                          color:
                            activity.type === "payment"
                              ? "var(--error-red)"
                              : "var(--success-green)",
                        }}
                      >
                        {activity.amount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--primary-text)" }}
              >
                Trust Score Breakdown
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: "var(--secondary-text)" }}>
                      Payment Consistency
                    </span>
                    <span style={{ color: "var(--success-green)" }}>95%</span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ background: "var(--secondary-background)" }}
                  >
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: "95%",
                        background:
                          "linear-gradient(90deg, var(--success-green), var(--info-cyan))",
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: "var(--secondary-text)" }}>
                      Group Participation
                    </span>
                    <span style={{ color: "var(--accent-blue)" }}>88%</span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ background: "var(--secondary-background)" }}
                  >
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: "88%",
                        background:
                          "linear-gradient(90deg, var(--accent-blue), var(--financial-blue))",
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: "var(--secondary-text)" }}>
                      Community Rating
                    </span>
                    <span style={{ color: "var(--premium-gold)" }}>92%</span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ background: "var(--secondary-background)" }}
                  >
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: "92%",
                        background:
                          "linear-gradient(90deg, var(--premium-gold), var(--warning-amber))",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

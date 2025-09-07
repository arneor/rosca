"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import MemberNavigation from "@/components/Navigation/MemberNavigation";
import MemberDashboard from "../../components/Dashboard/MemberDashboard";

export default function MemberLanding() {
  const router = useRouter();

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
          <div className="p-6 md:p-8">
            <MemberDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}



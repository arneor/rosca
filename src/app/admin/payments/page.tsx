"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AdminNavigation from "@/components/Navigation/AdminNavigation";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function AdminPaymentsPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  return (
    <div style={{ background: 'var(--primary-background)', minHeight: '100vh' }}>
      <AdminNavigation onLogout={handleLogout} />
      
      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8" style={{ 
            color: 'var(--primary-text)',
            fontFamily: 'var(--font-display)'
          }}>
            Payment Management
          </h1>
          
          <Card className="glass-card p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
              background: 'var(--secondary-background)'
            }}>
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-text)' }}>
              Payment Management System
            </h3>
            <p style={{ color: 'var(--secondary-text)' }}>
              Monitor transactions, process payments, and manage financial operations
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    // Check if user is authenticated and redirect appropriately
    const authToken = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");
    
    if (authToken && userType) {
      router.push(`/${userType}`);
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ 
      background: 'var(--primary-background)',
      color: 'var(--primary-text)'
    }}>
      <div className="max-w-md w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl font-bold mb-4" style={{ 
              background: 'linear-gradient(135deg, var(--financial-blue), var(--accent-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              404
            </div>
            <div className="absolute inset-0 text-8xl font-bold opacity-20 animate-pulse" style={{
              background: 'linear-gradient(135deg, var(--premium-gold), var(--warning-amber))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              404
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4" style={{ 
            color: 'var(--primary-text)',
            fontFamily: 'var(--font-display)'
          }}>
            Page Not Found
          </h1>
          <p className="text-lg mb-2" style={{ color: 'var(--secondary-text)' }}>
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Trust Elements */}
        <div className="mb-8 p-6 rounded-lg" style={{ 
          background: 'var(--glass-background)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'var(--glass-backdrop-blur)'
        }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, var(--success-green), var(--info-cyan))'
            }}>
              <span className="text-sm">🔒</span>
            </div>
            <span className="text-sm font-medium security-indicator">
              Your session is secure
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted-text)' }}>
            Don't worry, your data and financial information remain protected.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button onClick={handleGoHome} className="w-full">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Dashboard
          </Button>
          
          <Button variant="secondary" onClick={() => router.back()} className="w-full">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Button>

          <Button variant="ghost" onClick={handleLogout} className="w-full">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout & Return to Login
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--secondary-text)' }}>
            Need help? Here are some common pages:
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <button 
              onClick={() => router.push('/member/dashboard')}
              className="px-3 py-1 rounded-full transition-colors"
              style={{ 
                background: 'var(--card-background)',
                color: 'var(--accent-text)',
                border: '1px solid var(--glass-border)'
              }}
            >
              Member Dashboard
            </button>
            <button 
              onClick={() => router.push('/admin/dashboard')}
              className="px-3 py-1 rounded-full transition-colors"
              style={{ 
                background: 'var(--card-background)',
                color: 'var(--accent-text)',
                border: '1px solid var(--glass-border)'
              }}
            >
              Admin Dashboard
            </button>
            <button 
              onClick={() => router.push('/member/groups')}
              className="px-3 py-1 rounded-full transition-colors"
              style={{ 
                background: 'var(--card-background)',
                color: 'var(--accent-text)',
                border: '1px solid var(--glass-border)'
              }}
            >
              My Groups
            </button>
          </div>
        </div>

        {/* ROSCA Branding */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, var(--financial-blue), var(--success-green))'
          }}>
            <span className="font-bold text-xs" style={{ color: 'var(--primary-text)' }}>R</span>
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--muted-text)' }}>
            ROSCA Platform - Trust. Transparency. Together.
          </span>
        </div>
      </div>
    </div>
  );
}

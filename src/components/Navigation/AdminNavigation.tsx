"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/Button";

interface AdminNavigationProps {
  onLogout: () => void;
}

export default function AdminNavigation({ onLogout }: AdminNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { name: "Groups", href: "/admin/groups", icon: "🏦" },
    { name: "Members", href: "/admin/members", icon: "👥" },
    { name: "Payments", href: "/admin/payments", icon: "💳" },
    { name: "Reports", href: "/admin/reports", icon: "📈" },
    { name: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`} style={{
        background: 'var(--secondary-background)',
        borderRight: '1px solid var(--border)'
      }}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, var(--financial-blue), var(--success-green))'
            }}>
              <span className="font-bold text-lg" style={{ color: 'var(--primary-text)' }}>R</span>
            </div>
            <div>
              <h1 className="font-bold text-lg" style={{ color: 'var(--primary-text)' }}>ROSCA</h1>
              <p className="text-xs" style={{ color: 'var(--muted-text)' }}>Admin Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive(item.href) 
                      ? 'shadow-md' 
                      : 'hover:shadow-sm'
                  }`}
                  style={{
                    background: isActive(item.href) 
                      ? 'linear-gradient(135deg, var(--financial-blue), var(--accent-blue))'
                      : 'transparent',
                    color: isActive(item.href) 
                      ? 'var(--primary-text)'
                      : 'var(--secondary-text)',
                    borderLeft: isActive(item.href) 
                      ? '4px solid var(--premium-gold)'
                      : '4px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.background = 'var(--card-background)';
                      e.currentTarget.style.color = 'var(--primary-text)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--secondary-text)';
                    }
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3 p-3 rounded-lg mb-3" style={{
              background: 'var(--card-background)'
            }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, var(--premium-gold), var(--warning-amber))'
              }}>
                <span className="font-semibold" style={{ color: 'var(--primary-text)' }}>AD</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: 'var(--primary-text)' }}>Admin User</p>
                <p className="text-xs" style={{ color: 'var(--muted-text)' }}>Administrator</p>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={onLogout}
              className="w-full"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Toggle } from "@/components/Toggle";
import Card from "@/components/Card";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = React.useState<"admin" | "member">("admin");
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      localStorage.setItem("authToken", "demo-token");
      localStorage.setItem("userType", role);
      localStorage.setItem("userName", role === "admin" ? "Admin User" : "Member User");
      router.push(`/${role}`);
    }, 1000);
  };

  return (
    <div className="min-h-dvh">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-border-primary p-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary shadow-lg">
            <span className="text-2xl font-bold text-white">R</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">ROSCA</h1>
            <p className="text-sm text-text-secondary">Financial Platform</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 min-h-[calc(100vh-80px)] md:min-h-screen">
        <aside className="hidden md:flex flex-col justify-center items-center p-16 bg-white relative">

        
        {/* Minimal background pattern */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary-200 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-primary-200 rounded-full"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-md">
          <div className="flex flex-col items-center mb-12">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-primary to-accent-secondary shadow-2xl mb-6">
              <span className="text-5xl font-bold text-white">R</span>
            </div>
            <h1 className="text-6xl font-bold text-text-primary mb-3">ROSCA</h1>
            <p className="text-xl text-text-secondary font-medium">Financial Platform</p>
          </div>
          
          <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-text-primary">Trust. Transparency. Together.</h2>
            <p className="text-lg text-text-secondary leading-relaxed">Empowering communities through secure financial collaboration</p>
          </div>
          
          {/* Simple trust indicators */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-primary">10K+</div>
              <div className="text-sm text-text-tertiary">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-secondary">$2M+</div>
              <div className="text-sm text-text-tertiary">Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-tertiary">99.9%</div>
              <div className="text-sm text-text-tertiary">Uptime</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2 px-3 py-2 bg-accent-primary/10 text-accent-primary rounded-lg text-sm font-medium">
              <span>🛡️</span>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-accent-secondary/10 text-accent-secondary rounded-lg text-sm font-medium">
              <span>🔐</span>
              <span>2FA</span>
            </div>
          </div>
        </div>
      </aside>

        <main className="flex items-center justify-center p-4 md:p-16 bg-gradient-to-br from-surface-secondary via-surface-tertiary to-background-primary relative">
          {/* Premium background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 right-20 w-72 h-72 border border-accent-primary/30 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-56 h-56 border border-accent-secondary/30 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-accent-tertiary/20 rounded-full"></div>
          </div>
          
          <div className="w-full max-w-lg relative z-10">
            <div className="mb-8 md:mb-12 text-center">
              <div className="flex items-center justify-center space-x-4 mb-6 md:mb-8">
                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-primary to-accent-secondary shadow-2xl">
                  <span className="text-2xl md:text-3xl font-bold text-white">R</span>
                </div>
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-text-primary">Welcome Back</h2>
                  <p className="text-text-secondary text-sm md:text-lg">Sign in to your account</p>
                </div>
              </div>
              <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-accent-primary/10 text-accent-primary rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold border border-accent-primary/20">
                <span className="w-2 h-2 bg-accent-primary rounded-full mr-2 md:mr-3"></span>
                Secure Financial Platform
              </div>
            </div>
          
            <Toggle
              ariaLabel="Select role"
              className="mb-6 md:mb-10"
              options={[
                { value: "admin", label: "⚙️ Admin" },
                { value: "member", label: "👤 Member" },
              ]}
              value={role}
              onChange={(v) => setRole(v as "admin" | "member")}
            />

            <Card className="card-elevated p-6 md:p-10">
              {role === "admin" ? (
                <form className="space-y-6 md:space-y-8" onSubmit={handleLogin}>
                <div className="space-y-3">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="admin@company.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    leftIcon={
                      <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    }
                  />
                </div>
                <div className="space-y-3">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    leftIcon={
                      <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-3 text-sm text-text-secondary cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-border-primary bg-surface-primary text-accent-primary focus:ring-accent-primary"
                    />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-accent-secondary hover:text-accent-primary transition-colors font-semibold">
                    Forgot password?
                  </a>
                </div>
                  <Button type="submit" className="w-full h-12 md:h-14 text-base md:text-lg font-bold" isLoading={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-3 bg-accent-primary/10 text-accent-primary rounded-xl text-sm font-semibold border border-accent-primary/20">
                    <span className="mr-3">🔒</span>
                    Secured with 2FA for admin accounts
                  </div>
                </div>
              </form>
              ) : (
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    leftIcon={
                      <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="OTP Code"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      leftIcon={
                        <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" variant="secondary" className="w-full h-10">
                      Send OTP
                    </Button>
                  </div>
                </div>
                  <Button type="submit" className="w-full h-12 text-base font-semibold" isLoading={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-2 bg-accent-secondary/10 text-accent-secondary rounded-lg text-xs font-medium">
                    <span className="mr-2">📱</span>
                    One-time password via SMS • Biometric where supported
                  </div>
                </div>
              </form>
              )}
              <div className="mt-6 md:mt-8 text-center">
                <div className="inline-flex items-center px-3 md:px-4 py-2 bg-surface-secondary border border-border-primary rounded-xl text-xs md:text-sm text-text-secondary">
                  <span className="mr-2">💡</span>
                  New user? <a href="#" className="text-accent-secondary hover:text-accent-primary transition-colors font-medium ml-1">Learn how to get started</a>
                </div>
              </div>
            </Card>
            
            {/* Demo Credentials */}
            <div className="mt-4 md:mt-6 p-4 md:p-5 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 border border-accent-primary/20 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-accent-primary/10 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                  <span className="text-accent-primary text-xs md:text-sm">🔑</span>
                </div>
                <h4 className="text-xs md:text-sm font-semibold text-text-primary">Demo Credentials</h4>
              </div>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="bg-surface-primary p-3 rounded-lg border border-border-primary">
                  <div className="font-medium text-text-primary mb-1">
                    {role === "admin" ? "Admin Account" : "Member Account"}
                  </div>
                  <div className="text-text-secondary space-y-1">
                    <div><span className="font-medium">Email:</span> {role}@demo.com</div>
                    <div><span className="font-medium">Password:</span> demo123</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Card from "@/components/Card";

interface LoginFormProps {
  userType: "admin" | "member";
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onForgotPassword: (email: string) => void;
  onSwitchUserType: () => void;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginForm({ userType, onLogin, onForgotPassword, onSwitchUserType }: LoginFormProps) {
  const [credentials, setCredentials] = React.useState<LoginCredentials>({
    email: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await onLogin(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      onForgotPassword(forgotEmail);
      setShowForgotPassword(false);
      setForgotEmail("");
    }
  };

  const isFormValid = credentials.email && credentials.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-3xl">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-text-primary mb-2">
            {userType === "admin" ? "Admin Portal" : "Member Portal"}
          </h2>
          <p className="text-text-secondary text-lg">
            Welcome back to ROSCA
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-accent-primary/10 text-accent-primary rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-accent-primary rounded-full mr-2"></span>
            Secure Financial Platform
          </div>
        </div>

        {/* User Type Toggle */}
        <div className="flex justify-center">
          <div className="bg-surface-secondary p-1 rounded-xl border border-border-primary shadow-sm">
            <button
              onClick={onSwitchUserType}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                userType === "member"
                  ? "bg-accent-primary text-white shadow-md"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-primary"
              }`}
            >
              👤 Member
            </button>
            <button
              onClick={onSwitchUserType}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                userType === "admin"
                  ? "bg-accent-primary text-white shadow-md"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-primary"
              }`}
            >
              ⚙️ Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <Card className="card-elevated">
          {!showForgotPassword ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-accent-danger/10 border border-accent-danger/20 rounded-xl p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-accent-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-accent-danger">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-text-primary">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                  required
                  leftIcon={
                    <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-text-primary">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                  leftIcon={
                    <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={credentials.rememberMe}
                    onChange={(e) => setCredentials(prev => ({ ...prev, rememberMe: e.target.checked }))}
                    className="h-4 w-4 text-accent-primary focus:ring-accent-primary border-border-primary rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-text-secondary">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-accent-secondary hover:text-accent-primary transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={!isFormValid || isLoading}
                isLoading={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-6 p-5 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 border border-accent-primary/20 rounded-xl">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-accent-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-accent-primary text-sm">💡</span>
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary">Demo Credentials</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-surface-primary p-3 rounded-lg border border-border-primary">
                    <div className="font-medium text-text-primary mb-1">
                      {userType === "admin" ? "Admin Account" : "Member Account"}
                    </div>
                    <div className="text-text-secondary space-y-1">
                      <div><span className="font-medium">Email:</span> {userType}@demo.com</div>
                      <div><span className="font-medium">Password:</span> demo123</div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Reset Password</h3>
                <p className="mt-2 text-text-secondary">
                  Enter your email address and we&apos;ll send you a secure reset link
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="forgot-email" className="block text-sm font-semibold text-text-primary">
                  Email Address
                </label>
                <Input
                  id="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  leftIcon={
                    <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 h-12"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12"
                  disabled={!forgotEmail}
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Security Notice */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-surface-primary border border-border-primary rounded-xl shadow-sm">
            <svg className="w-4 h-4 text-accent-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-xs font-medium text-text-secondary">
              Protected by industry-standard encryption and security measures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

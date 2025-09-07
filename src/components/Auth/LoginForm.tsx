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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-brand-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {userType === "admin" ? "Admin Login" : "Member Login"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your ROSCA {userType} account
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={onSwitchUserType}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                userType === "member"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Member
            </button>
            <button
              onClick={onSwitchUserType}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                userType === "admin"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <Card>
          {!showForgotPassword ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={credentials.rememberMe}
                    onChange={(e) => setCredentials(prev => ({ ...prev, rememberMe: e.target.checked }))}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-brand-600 hover:text-brand-500"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid || isLoading}
                isLoading={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>
                    <strong>{userType === "admin" ? "Admin" : "Member"}:</strong>
                    <br />
                    Email: {userType}@demo.com
                    <br />
                    Password: demo123
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Reset Password</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your email address and we'll send you a reset link
                </p>
              </div>

              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
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
          <p className="text-xs text-gray-500">
            Protected by industry-standard encryption and security measures
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

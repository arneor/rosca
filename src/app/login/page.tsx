"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = React.useState<"admin" | "member">("member");

  const handleLogin = async (credentials: LoginCredentials) => {
    // Mock authentication - in real implementation, this would call an API
    console.log("Login attempt:", { ...credentials, userType });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    const validCredentials = {
      admin: { email: "admin@demo.com", password: "demo123" },
      member: { email: "member@demo.com", password: "demo123" }
    };
    
    const valid = validCredentials[userType];
    if (credentials.email === valid.email && credentials.password === valid.password) {
      // Store auth state (in real app, this would be handled by auth context/state management)
      localStorage.setItem("authToken", "mock-jwt-token");
      // Mock authentication - replace with real API call
      localStorage.setItem("authToken", "mock-token");
      localStorage.setItem("userType", userType);
      
      // Redirect to appropriate dashboard
      router.push(`/${userType}`);
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const handleForgotPassword = (email: string) => {
    // Mock forgot password functionality
    console.log("Password reset requested for:", email);
    alert(`Password reset link sent to ${email}`);
  };

  const handleSwitchUserType = () => {
    setUserType(prev => prev === "admin" ? "member" : "admin");
  };

  return (
    <LoginForm
      userType={userType}
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSwitchUserType={handleSwitchUserType}
    />
  );
}

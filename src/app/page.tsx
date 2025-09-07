"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");

    if (authToken && userType) {
      // Redirect to appropriate dashboard
      router.push(`/${userType}`);
    } else {
      // Redirect to login page
      router.push("/login");
    }
  }, [router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "var(--primary-background)",
        color: "var(--primary-text)",
      }}
    >
      <div className="text-center">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{
            background:
              "linear-gradient(135deg, var(--financial-blue), var(--success-green))",
          }}
        >
          <span
            className="font-bold text-2xl"
            style={{ color: "var(--primary-text)" }}
          >
            R
          </span>
        </div>
        <h1
          className="text-2xl font-semibold mb-2"
          style={{
            color: "var(--primary-text)",
            fontFamily: "var(--font-display)",
          }}
        >
          ROSCA Platform
        </h1>
        <p className="mb-6" style={{ color: "var(--secondary-text)" }}>
          Loading your dashboard...
        </p>
        <div className="flex justify-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2"
            style={{
              borderColor: "var(--financial-blue)",
            }}
          ></div>
        </div>
        <div className="mt-6">
          <Button onClick={() => router.push("/login")} variant="secondary">
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
}

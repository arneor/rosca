"use client";

import * as React from "react";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

interface PaymentMethod {
  id: string;
  type: "upi" | "bank" | "wallet" | "crypto" | "card";
  name: string;
  identifier: string; // UPI ID, Account number, etc.
  isDefault: boolean;
  isVerified: boolean;
  provider?: string;
  lastUsed?: Date;
  fees?: {
    fixed: number;
    percentage: number;
  };
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethodId?: string;
  onMethodSelect: (methodId: string) => void;
  onAddMethod: () => void;
  showFees?: boolean;
  amount?: number;
}

export function PaymentMethodSelector({
  methods,
  selectedMethodId,
  onMethodSelect,
  onAddMethod,
  showFees = false,
  amount = 0,
}: PaymentMethodSelectorProps) {
  const getMethodIcon = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "upi":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        );
      case "bank":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case "wallet":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        );
      case "crypto":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        );
      case "card":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        );
    }
  };

  const calculateFees = (method: PaymentMethod, amount: number) => {
    if (!method.fees) return 0;
    return method.fees.fixed + (amount * method.fees.percentage) / 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const maskIdentifier = (identifier: string, type: PaymentMethod["type"]) => {
    if (type === "card") {
      return `****${identifier.slice(-4)}`;
    }
    if (type === "bank") {
      return `****${identifier.slice(-4)}`;
    }
    return identifier;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/* <h3 className="font-medium text-gray-900">Payment Methods</h3> */}
        <Button size="sm" variant="ghost" onClick={onAddMethod}>
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Method
        </Button>
      </div>

      <div className="space-y-3">
        {methods.map((method) => {
          const isSelected = selectedMethodId === method.id;
          const fees =
            showFees && amount > 0 ? calculateFees(method, amount) : 0;

          return (
            <Card
              key={method.id}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? "ring-2 ring-brand-500 border-brand-500 bg-brand-50"
                  : "hover:border-gray-300"
              }`}
              onClick={() => onMethodSelect(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      method.type === "upi"
                        ? "bg-blue-100 text-blue-600"
                        : method.type === "bank"
                        ? "bg-green-100 text-green-600"
                        : method.type === "wallet"
                        ? "bg-purple-100 text-purple-600"
                        : method.type === "crypto"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {getMethodIcon(method.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {method.name}
                      </span>
                      {method.isDefault && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                          Default
                        </span>
                      )}
                      {method.isVerified ? (
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-yellow-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>
                        {maskIdentifier(method.identifier, method.type)}
                      </span>
                      {method.provider && (
                        <>
                          <span>•</span>
                          <span>{method.provider}</span>
                        </>
                      )}
                    </div>
                    {method.lastUsed && (
                      <p className="text-xs text-gray-400">
                        Last used:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                        }).format(method.lastUsed)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {showFees && amount > 0 && (
                    <div className="text-sm">
                      <p className="text-gray-500">
                        Fee: {formatCurrency(fees)}
                      </p>
                      <p className="font-medium">
                        Total: {formatCurrency(amount + fees)}
                      </p>
                    </div>
                  )}

                  <div
                    className={`w-4 h-4 rounded-full border-2 mt-2 ${
                      isSelected
                        ? "border-brand-500 bg-brand-500"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {methods.length === 0 && (
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No payment methods
          </h3>
          <p className="text-gray-500 mb-4">
            Add a payment method to make contributions
          </p>
          <Button onClick={onAddMethod}>
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Payment Method
          </Button>
        </div>
      )}
    </div>
  );
}

export default PaymentMethodSelector;

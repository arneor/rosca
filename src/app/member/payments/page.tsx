"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import MemberNavigation from "@/components/Navigation/MemberNavigation";
import PaymentMethodSelector from "@/components/Payments/PaymentMethodSelector";
import QuickPayModal from "@/components/Payments/QuickPayModal";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

interface PaymentDue {
  id: string;
  groupName: string;
  amount: number;
  dueDate: Date;
  status: "due" | "overdue";
}

interface PaymentMethod {
  id: string;
  type: "upi" | "bank" | "wallet" | "crypto" | "card";
  name: string;
  identifier: string;
  isDefault: boolean;
  isVerified: boolean;
  provider?: string;
  lastUsed?: Date;
  fees?: {
    fixed: number;
    percentage: number;
  };
}

interface PaymentHistory {
  id: string;
  groupName: string;
  amount: number;
  date: Date;
  status: "completed" | "pending" | "failed";
  method: string;
  transactionId?: string;
}

export default function MemberPaymentsPage() {
  const router = useRouter();
  const [showQuickPay, setShowQuickPay] = React.useState(false);
  const [selectedMethodId, setSelectedMethodId] = React.useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  // Mock data - in real implementation, this would come from API
  const [paymentsDue] = React.useState<PaymentDue[]>([
    {
      id: "1",
      groupName: "Festival Savings Circle",
      amount: 500,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: "due",
    },
    {
      id: "2",
      groupName: "Emergency Fund Group",
      amount: 1000,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "due",
    },
    {
      id: "3",
      groupName: "Education Fund",
      amount: 750,
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "overdue",
    },
  ]);

  const [paymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: "1",
      type: "upi",
      name: "Google Pay",
      identifier: "user@okaxis",
      isDefault: true,
      isVerified: true,
      provider: "Google Pay",
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      fees: { fixed: 0, percentage: 0 },
    },
    {
      id: "2",
      type: "bank",
      name: "HDFC Bank",
      identifier: "1234567890",
      isDefault: false,
      isVerified: true,
      provider: "HDFC Bank",
      lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      fees: { fixed: 2, percentage: 0.5 },
    },
    {
      id: "3",
      type: "wallet",
      name: "Paytm Wallet",
      identifier: "+91 9876543210",
      isDefault: false,
      isVerified: true,
      provider: "Paytm",
      fees: { fixed: 1, percentage: 0.2 },
    },
  ]);

  const [paymentHistory] = React.useState<PaymentHistory[]>([
    {
      id: "1",
      groupName: "Festival Savings Circle",
      amount: 500,
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      status: "completed",
      method: "Google Pay",
      transactionId: "TXN123456789",
    },
    {
      id: "2",
      groupName: "Emergency Fund Group",
      amount: 1000,
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      status: "completed",
      method: "HDFC Bank",
      transactionId: "TXN123456788",
    },
    {
      id: "3",
      groupName: "Education Fund",
      amount: 750,
      date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
      status: "completed",
      method: "Google Pay",
      transactionId: "TXN123456787",
    },
  ]);

  const totalDueAmount = paymentsDue.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const overdueCount = paymentsDue.filter((p) => p.status === "overdue").length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Tomorrow";
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days overdue`;
    return `${diffInDays} days`;
  };

  const handleQuickPayment = async (
    paymentIds: string[],
    methodId: string,
    amount: number
  ) => {
    // Mock payment processing
    console.log("Processing payment:", { paymentIds, methodId, amount });
    // In real implementation, this would call the payment API
  };

  const handleAddPaymentMethod = () => {
    // Navigate to add payment method page
    console.log("Add payment method");
  };

  return (
    <div
      style={{ background: "var(--primary-background)", minHeight: "100vh" }}
    >
      <MemberNavigation onLogout={handleLogout} />

      <main className="ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Payments</h1>
                <p className="text-muted mt-1">
                  Manage your contributions and payment methods
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Payment Calendar
                </Button>
                <Button onClick={() => setShowQuickPay(true)}>
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                  Quick Pay
                </Button>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                className={overdueCount > 0 ? "border-red-200 bg-red-50" : ""}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      overdueCount > 0 ? "bg-red-100" : "bg-yellow-100"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        overdueCount > 0 ? "text-red-600" : "text-yellow-600"
                      }`}
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Due</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalDueAmount)}
                    </p>
                    {overdueCount > 0 && (
                      <p className="text-xs text-red-600">
                        {overdueCount} overdue
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold">{formatCurrency(2250)}</p>
                    <p className="text-xs text-green-600">3 payments made</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Methods</p>
                    <p className="text-2xl font-bold">
                      {paymentMethods.length}
                    </p>
                    <p className="text-xs text-blue-600">
                      {paymentMethods.filter((m) => m.isVerified).length}{" "}
                      verified
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Due Payments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Due Payments</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowQuickPay(true)}
                >
                  Pay All
                </Button>
              </div>

              <div className="space-y-3">
                {paymentsDue.map((payment) => (
                  <Card
                    key={payment.id}
                    className={`${
                      payment.status === "overdue"
                        ? "border-red-200 bg-red-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{payment.groupName}</h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === "overdue"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{formatCurrency(payment.amount)}</span>
                          <span>•</span>
                          <span>Due {getDaysUntil(payment.dueDate)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          Schedule
                        </Button>
                        <Button size="sm">Pay Now</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
              <PaymentMethodSelector
                methods={paymentMethods}
                selectedMethodId={selectedMethodId}
                onMethodSelect={setSelectedMethodId}
                onAddMethod={handleAddPaymentMethod}
              />
            </div>

            {/* Recent Payments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Payments</h2>
                <Button size="sm" variant="ghost">
                  View All
                </Button>
              </div>

              <Card className="p-0 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {paymentHistory.slice(0, 5).map((payment) => (
                    <div key={payment.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {payment.groupName}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                payment.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{formatDate(payment.date)}</span>
                            <span>•</span>
                            <span>{payment.method}</span>
                            {payment.transactionId && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-xs">
                                  {payment.transactionId}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(payment.amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Pay Modal */}
      <QuickPayModal
        isOpen={showQuickPay}
        onClose={() => setShowQuickPay(false)}
        paymentsDue={paymentsDue}
        paymentMethods={paymentMethods}
        onPaymentSubmit={handleQuickPayment}
      />
    </div>
  );
}

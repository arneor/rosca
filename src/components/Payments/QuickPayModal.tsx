"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import PaymentMethodSelector from "./PaymentMethodSelector";

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

interface QuickPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentsDue: PaymentDue[];
  paymentMethods: PaymentMethod[];
  onPaymentSubmit: (payments: string[], methodId: string, amount: number) => void;
}

export function QuickPayModal({
  isOpen,
  onClose,
  paymentsDue,
  paymentMethods,
  onPaymentSubmit
}: QuickPayModalProps) {
  const [selectedPayments, setSelectedPayments] = React.useState<string[]>([]);
  const [selectedMethodId, setSelectedMethodId] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [customAmount, setCustomAmount] = React.useState<number>(0);
  const [paymentMode, setPaymentMode] = React.useState<"all" | "selected" | "custom">("all");

  React.useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setSelectedPayments([]);
      setSelectedMethodId(paymentMethods.find(m => m.isDefault)?.id || "");
      setPaymentMode("all");
      setCustomAmount(0);
    }
  }, [isOpen, paymentMethods]);

  const totalDueAmount = React.useMemo(() => {
    if (paymentMode === "custom") return customAmount;
    if (paymentMode === "selected") {
      return paymentsDue
        .filter(p => selectedPayments.includes(p.id))
        .reduce((sum, p) => sum + p.amount, 0);
    }
    return paymentsDue.reduce((sum, p) => sum + p.amount, 0);
  }, [paymentsDue, selectedPayments, paymentMode, customAmount]);

  const handlePaymentToggle = (paymentId: string) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPayments(paymentsDue.map(p => p.id));
  };

  const handleDeselectAll = () => {
    setSelectedPayments([]);
  };

  const handleSubmit = async () => {
    if (!selectedMethodId || totalDueAmount <= 0) return;

    setIsProcessing(true);
    try {
      let paymentsToProcess: string[] = [];
      
      if (paymentMode === "all") {
        paymentsToProcess = paymentsDue.map(p => p.id);
      } else if (paymentMode === "selected") {
        paymentsToProcess = selectedPayments;
      } else {
        // For custom amount, we'll process all due payments proportionally
        paymentsToProcess = paymentsDue.map(p => p.id);
      }

      await onPaymentSubmit(paymentsToProcess, selectedMethodId, totalDueAmount);
      onClose();
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Tomorrow";
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days overdue`;
    return `${diffInDays} days`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Quick Pay</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Pay your due contributions quickly and securely
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Payment Mode Selection */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Payment Options</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="all"
                    checked={paymentMode === "all"}
                    onChange={(e) => setPaymentMode(e.target.value as "all")}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Pay all due amounts ({formatCurrency(paymentsDue.reduce((sum, p) => sum + p.amount, 0))})
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="selected"
                    checked={paymentMode === "selected"}
                    onChange={(e) => setPaymentMode(e.target.value as "selected")}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Pay selected amounts
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="custom"
                    checked={paymentMode === "custom"}
                    onChange={(e) => setPaymentMode(e.target.value as "custom")}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Custom amount
                  </span>
                </label>
              </div>
            </div>

            {/* Custom Amount Input */}
            {paymentMode === "custom" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <Input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                  leftIcon={
                    <span className="text-gray-500">$</span>
                  }
                />
              </div>
            )}

            {/* Payment Selection */}
            {paymentMode === "selected" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Select Payments</h4>
                  <div className="space-x-2">
                    <button
                      onClick={handleSelectAll}
                      className="text-xs text-brand-600 hover:text-brand-700"
                    >
                      Select All
                    </button>
                    <button
                      onClick={handleDeselectAll}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {paymentsDue.map((payment) => (
                    <label key={payment.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => handlePaymentToggle(payment.id)}
                        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{payment.groupName}</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'overdue' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                          <span className="text-gray-500">Due {formatDate(payment.dueDate)}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <PaymentMethodSelector
              methods={paymentMethods}
              selectedMethodId={selectedMethodId}
              onMethodSelect={setSelectedMethodId}
              onAddMethod={() => {/* Handle add method */}}
              showFees={true}
              amount={totalDueAmount}
            />

            {/* Payment Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Payment Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(totalDueAmount)}</span>
                </div>
                {selectedMethodId && paymentMethods.find(m => m.id === selectedMethodId)?.fees && (
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>{formatCurrency(
                      (paymentMethods.find(m => m.id === selectedMethodId)?.fees?.fixed || 0) +
                      (totalDueAmount * (paymentMethods.find(m => m.id === selectedMethodId)?.fees?.percentage || 0) / 100)
                    )}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium text-lg border-t border-gray-200 pt-1">
                  <span>Total:</span>
                  <span>{formatCurrency(
                    totalDueAmount + 
                    (selectedMethodId && paymentMethods.find(m => m.id === selectedMethodId)?.fees 
                      ? (paymentMethods.find(m => m.id === selectedMethodId)?.fees?.fixed || 0) +
                        (totalDueAmount * (paymentMethods.find(m => m.id === selectedMethodId)?.fees?.percentage || 0) / 100)
                      : 0)
                  )}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={!selectedMethodId || totalDueAmount <= 0 || isProcessing}
              isLoading={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ${formatCurrency(totalDueAmount)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickPayModal;

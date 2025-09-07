"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Card from "@/components/Card";

interface GroupTemplate {
  id: string;
  name: string;
  description: string;
  suggestedAmount: number;
  suggestedMembers: number;
  suggestedCycles: number;
  riskLevel: "low" | "medium" | "high";
  category: "festival" | "emergency" | "business" | "education" | "custom";
}

interface GroupData {
  name: string;
  description: string;
  contributionAmount: number;
  maxMembers: number;
  totalCycles: number;
  payoutFrequency: string;
  startDate: string;
  riskLevel: "low" | "medium" | "high";
  requiresApproval: boolean;
  minimumReliabilityScore: number;
  securityDeposit: number;
  category: GroupTemplate['category'];
  template?: string;
}

interface CreateGroupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (groupData: GroupData) => void;
}

const groupTemplates: GroupTemplate[] = [
  {
    id: "festival",
    name: "Festival Savings",
    description: "Save for seasonal celebrations and gifts",
    suggestedAmount: 500,
    suggestedMembers: 12,
    suggestedCycles: 12,
    riskLevel: "low",
    category: "festival"
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    description: "Build emergency funds for unexpected expenses",
    suggestedAmount: 1000,
    suggestedMembers: 10,
    suggestedCycles: 10,
    riskLevel: "medium",
    category: "emergency"
  },
  {
    id: "business",
    name: "Business Investment",
    description: "Fund small business ventures and startups",
    suggestedAmount: 2000,
    suggestedMembers: 15,
    suggestedCycles: 15,
    riskLevel: "high",
    category: "business"
  },
  {
    id: "education",
    name: "Education Fund",
    description: "Support children's education expenses",
    suggestedAmount: 750,
    suggestedMembers: 10,
    suggestedCycles: 10,
    riskLevel: "low",
    category: "education"
  }
];

export function CreateGroupWizard({ isOpen, onClose, onSubmit }: CreateGroupWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedTemplate, setSelectedTemplate] = React.useState<GroupTemplate | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    contributionAmount: 0,
    maxMembers: 0,
    totalCycles: 0,
    payoutFrequency: "monthly",
    startDate: "",
    riskLevel: "medium" as "low" | "medium" | "high",
    requiresApproval: true,
    minimumReliabilityScore: 70,
    securityDeposit: 0,
    category: "custom" as GroupTemplate['category']
  });

  const totalSteps = 4;

  React.useEffect(() => {
    if (selectedTemplate) {
      setFormData(prev => ({
        ...prev,
        contributionAmount: selectedTemplate.suggestedAmount,
        maxMembers: selectedTemplate.suggestedMembers,
        totalCycles: selectedTemplate.suggestedCycles,
        riskLevel: selectedTemplate.riskLevel,
        category: selectedTemplate.category
      }));
    }
  }, [selectedTemplate]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      template: selectedTemplate?.id || "custom"
    });
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return selectedTemplate !== null || formData.category === "custom";
      case 2:
        return formData.name.trim() !== "" && formData.description.trim() !== "";
      case 3:
        return formData.contributionAmount > 0 && formData.maxMembers > 0 && formData.totalCycles > 0;
      case 4:
        return formData.startDate !== "";
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Create New ROSCA Group</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <React.Fragment key={i}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      i + 1 <= currentStep 
                        ? 'bg-brand-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        i + 1 < currentStep ? 'bg-brand-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Template</span>
                <span>Details</span>
                <span>Settings</span>
                <span>Review</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Step 1: Template Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Choose a Template</h4>
                  <p className="text-sm text-gray-600">
                    Select a pre-configured template or start with a custom setup
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'ring-2 ring-brand-500 border-brand-500'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-900">{template.name}</h5>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            template.riskLevel === 'low' 
                              ? 'bg-green-100 text-green-800'
                              : template.riskLevel === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {template.riskLevel} risk
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                        <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">${template.suggestedAmount}</span>
                            <br />per member
                          </div>
                          <div>
                            <span className="font-medium">{template.suggestedMembers}</span>
                            <br />members
                          </div>
                          <div>
                            <span className="font-medium">{template.suggestedCycles}</span>
                            <br />cycles
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {/* Custom Option */}
                  <Card
                    className={`cursor-pointer transition-all ${
                      formData.category === 'custom' && !selectedTemplate
                        ? 'ring-2 ring-brand-500 border-brand-500'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedTemplate(null);
                      setFormData(prev => ({ ...prev, category: 'custom' }));
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-gray-900">Custom Setup</h5>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">
                        Configure all settings manually for maximum flexibility
                      </p>
                      <div className="text-xs text-gray-500">
                        Full customization available
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 2: Basic Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Group Details</h4>
                  <p className="text-sm text-gray-600">
                    Provide basic information about your ROSCA group
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter group name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the purpose and goals of this group"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Financial Settings */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Financial Configuration</h4>
                  <p className="text-sm text-gray-600">
                    Set contribution amounts and group size
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contribution Amount ($) *
                    </label>
                    <Input
                      type="number"
                      value={formData.contributionAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, contributionAmount: Number(e.target.value) }))}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Members *
                    </label>
                    <Input
                      type="number"
                      value={formData.maxMembers}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxMembers: Number(e.target.value) }))}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Cycles *
                    </label>
                    <Input
                      type="number"
                      value={formData.totalCycles}
                      onChange={(e) => setFormData(prev => ({ ...prev, totalCycles: Number(e.target.value) }))}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payout Frequency
                    </label>
                    <select
                      value={formData.payoutFrequency}
                      onChange={(e) => setFormData(prev => ({ ...prev, payoutFrequency: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Deposit ($)
                    </label>
                    <Input
                      type="number"
                      value={formData.securityDeposit}
                      onChange={(e) => setFormData(prev => ({ ...prev, securityDeposit: Number(e.target.value) }))}
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional refundable deposit to ensure commitment
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Reliability Score
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.minimumReliabilityScore}
                      onChange={(e) => setFormData(prev => ({ ...prev, minimumReliabilityScore: Number(e.target.value) }))}
                      placeholder="70"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum score required for members to join (0-100)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review and Launch */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Review and Launch</h4>
                  <p className="text-sm text-gray-600">
                    Review your group settings and set the start date
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requiresApproval"
                      checked={formData.requiresApproval}
                      onChange={(e) => setFormData(prev => ({ ...prev, requiresApproval: e.target.checked }))}
                      className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requiresApproval" className="ml-2 block text-sm text-gray-900">
                      Require admin approval for new members
                    </label>
                  </div>
                </div>
                
                {/* Summary */}
                <Card className="bg-gray-50">
                  <h5 className="font-medium text-gray-900 mb-3">Group Summary</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Contribution:</span>
                      <span className="ml-2 font-medium">${formData.contributionAmount}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Members:</span>
                      <span className="ml-2 font-medium">{formData.maxMembers}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Cycles:</span>
                      <span className="ml-2 font-medium">{formData.totalCycles}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Fund:</span>
                      <span className="ml-2 font-medium">${formData.contributionAmount * formData.maxMembers}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Frequency:</span>
                      <span className="ml-2 font-medium capitalize">{formData.payoutFrequency}</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
            <Button
              variant="secondary"
              onClick={currentStep === 1 ? onClose : handlePrevious}
            >
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>
            
            <Button
              onClick={currentStep === totalSteps ? handleSubmit : handleNext}
              disabled={!isStepValid()}
            >
              {currentStep === totalSteps ? 'Create Group' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupWizard;


import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormData } from "@/modules/onboarding/lib/onboarding-form-schema";

const AdditionalContextStep = () => {
  const { register, formState: { errors }, setValue } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Health Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="creditScore">Credit Score (Optional)</Label>
              <Input
                id="creditScore"
                type="number"
                {...register('additionalContext.creditScore', { valueAsNumber: true })}
                placeholder="e.g., 750 (300-850 range)"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Helps assess loan eligibility and rates</p>
              {errors.additionalContext?.creditScore && (
                <p className="text-sm text-red-600">{errors.additionalContext.creditScore.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyFundMonths">Emergency Fund Coverage *</Label>
              <Input
                id="emergencyFundMonths"
                type="number"
                step="0.5"
                {...register('additionalContext.emergencyFundMonths', { valueAsNumber: true })}
                placeholder="e.g., 3.5"
                className="w-full"
              />
              <p className="text-sm text-gray-600">How many months of expenses you can cover</p>
              {errors.additionalContext?.emergencyFundMonths && (
                <p className="text-sm text-red-600">{errors.additionalContext.emergencyFundMonths.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Approximate Tax Rate (%) *</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.5"
                {...register('additionalContext.taxRate', { valueAsNumber: true })}
                placeholder="e.g., 22"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Your effective tax rate for income calculations</p>
              {errors.additionalContext?.taxRate && (
                <p className="text-sm text-red-600">{errors.additionalContext.taxRate.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Career & Retirement Planning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobStability">Job Stability *</Label>
              <Select onValueChange={(value) => setValue('additionalContext.jobStability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Assess your job stability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-stable">Very Stable - Permanent position</SelectItem>
                  <SelectItem value="stable">Stable - Regular employment</SelectItem>
                  <SelectItem value="moderate">Moderate - Some uncertainty</SelectItem>
                  <SelectItem value="unstable">Unstable - Contract/freelance</SelectItem>
                  <SelectItem value="very-unstable">Very Unstable - Job at risk</SelectItem>
                </SelectContent>
              </Select>
              {errors.additionalContext?.jobStability && (
                <p className="text-sm text-red-600">{errors.additionalContext.jobStability.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirementAge">Planned Retirement Age *</Label>
              <Input
                id="retirementAge"
                type="number"
                {...register('additionalContext.retirementAge', { valueAsNumber: true })}
                placeholder="e.g., 65"
                className="w-full"
              />
              <p className="text-sm text-gray-600">When you plan to retire</p>
              {errors.additionalContext?.retirementAge && (
                <p className="text-sm text-red-600">{errors.additionalContext.retirementAge.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Privacy & Data Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-green-700 space-y-2">
            <p><strong>🔒 Your data is secure:</strong> All information is encrypted and stored securely.</p>
            <p><strong>🎯 Better advice:</strong> More complete information helps provide more accurate financial recommendations.</p>
            <p><strong>🔄 Always updatable:</strong> You can update your financial profile at any time as your situation changes.</p>
            <p><strong>📊 Optional fields:</strong> While all fields help improve accuracy, some are optional if you prefer not to share.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalContextStep;
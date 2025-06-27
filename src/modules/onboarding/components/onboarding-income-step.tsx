import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormData } from '@/modules/onboarding/lib/onboarding-form-schema';

const IncomeStep = () => {
  const { register, formState: { errors }, setValue } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Primary Income</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryIncome">Monthly Income (After Tax) *</Label>
              <Input
                id="primaryIncome"
                type="number"
                {...register('income.primaryIncome', { valueAsNumber: true })}
                placeholder="e.g., 5000"
                className="w-full"
              />
              {errors.income?.primaryIncome && (
                <p className="text-sm text-red-600">{errors.income.primaryIncome.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation *</Label>
              <Input
                id="occupation"
                {...register('income.occupation')}
                placeholder="e.g., Software Engineer"
                className="w-full"
              />
              {errors.income?.occupation && (
                <p className="text-sm text-red-600">{errors.income.occupation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">Employment Type *</Label>
              <Select onValueChange={(value) => setValue('income.jobType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
              {errors.income?.jobType && (
                <p className="text-sm text-red-600">{errors.income.jobType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="incomeFrequency">Pay Frequency *</Label>
              <Select onValueChange={(value) => setValue('income.incomeFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pay frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
              {errors.income?.incomeFrequency && (
                <p className="text-sm text-red-600">{errors.income.incomeFrequency.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="extraIncome">Monthly Extra Income</Label>
            <Input
              id="extraIncome"
              type="number"
              {...register('income.extraIncome', { valueAsNumber: true })}
              placeholder="e.g., 1000 (rental, investments, side hustle)"
              className="w-full"
            />
            <p className="text-sm text-gray-600">
              Include rental income, investments, bonuses, freelance work, etc.
            </p>
            {errors.income?.extraIncome && (
              <p className="text-sm text-red-600">{errors.income.extraIncome.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeStep;

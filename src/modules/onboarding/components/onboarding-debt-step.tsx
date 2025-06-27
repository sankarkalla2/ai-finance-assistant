import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';
import type { FormData } from '@/modules/onboarding/lib/onboarding-form-schema';

const DebtsStep = () => {
  const { register, control, formState: { errors }, setValue } = useFormContext<FormData>();
  
  const { fields: loanFields, append: appendLoan, remove: removeLoan } = useFieldArray({
    control,
    name: 'debts.loans',
  });

  const { fields: emiFields, append: appendEMI, remove: removeEMI } = useFieldArray({
    control,
    name: 'debts.existingEMIs',
  });

  const addLoan = () => {
    appendLoan({ type: '', balance: 0, interestRate: 0, monthlyPayment: 0, remainingTerm: 0 });
  };

  const addEMI = () => {
    appendEMI({ purpose: '', amount: 0, duration: 0 });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Credit Cards & General Debt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="creditCardDebt">Total Credit Card Debt</Label>
              <Input
                id="creditCardDebt"
                type="number"
                {...register('debts.creditCardDebt', { valueAsNumber: true })}
                placeholder="e.g., 5000"
                className="w-full"
              />
              {errors.debts?.creditCardDebt && (
                <p className="text-sm text-red-600">{errors.debts.creditCardDebt.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherLiabilities">Other Liabilities</Label>
              <Input
                id="otherLiabilities"
                type="number"
                {...register('debts.otherLiabilities', { valueAsNumber: true })}
                placeholder="e.g., 2000"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Medical bills, family loans, etc.</p>
              {errors.debts?.otherLiabilities && (
                <p className="text-sm text-red-600">{errors.debts.otherLiabilities.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mortgage Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mortgageBalance">Outstanding Balance</Label>
              <Input
                id="mortgageBalance"
                type="number"
                {...register('debts.mortgage.balance', { valueAsNumber: true })}
                placeholder="e.g., 250000"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mortgageRate">Interest Rate (%)</Label>
              <Input
                id="mortgageRate"
                type="number"
                step="0.01"
                {...register('debts.mortgage.interestRate', { valueAsNumber: true })}
                placeholder="e.g., 3.5"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mortgagePayment">Monthly Payment</Label>
              <Input
                id="mortgagePayment"
                type="number"
                {...register('debts.mortgage.monthlyPayment', { valueAsNumber: true })}
                placeholder="e.g., 1500"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mortgageYears">Years Remaining</Label>
              <Input
                id="mortgageYears"
                type="number"
                {...register('debts.mortgage.yearsLeft', { valueAsNumber: true })}
                placeholder="e.g., 25"
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Loans
            <Button type="button" onClick={addLoan} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Loan
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loanFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No loans added yet</p>
          ) : (
            <div className="space-y-4">
              {loanFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Loan Type</Label>
                    <Select onValueChange={(value) => setValue(`debts.loans.${index}.type`, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Balance</Label>
                    <Input
                      type="number"
                      {...register(`debts.loans.${index}.balance`, { valueAsNumber: true })}
                      placeholder="Balance"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Interest Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register(`debts.loans.${index}.interestRate`, { valueAsNumber: true })}
                      placeholder="Rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Payment</Label>
                    <Input
                      type="number"
                      {...register(`debts.loans.${index}.monthlyPayment`, { valueAsNumber: true })}
                      placeholder="Payment"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Remaining Term (months)</Label>
                    <Input
                      type="number"
                      {...register(`debts.loans.${index}.remainingTerm`, { valueAsNumber: true })}
                      placeholder="Term"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLoan(index)}
                      className="w-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Existing EMIs
            <Button type="button" onClick={addEMI} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add EMI
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {emiFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No EMIs added yet</p>
          ) : (
            <div className="space-y-4">
              {emiFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Purpose</Label>
                    <Input
                      {...register(`debts.existingEMIs.${index}.purpose`)}
                      placeholder="e.g., Refrigerator, Furniture"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Amount</Label>
                    <Input
                      type="number"
                      {...register(`debts.existingEMIs.${index}.amount`, { valueAsNumber: true })}
                      placeholder="EMI amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Remaining Duration (months)</Label>
                    <Input
                      type="number"
                      {...register(`debts.existingEMIs.${index}.duration`, { valueAsNumber: true })}
                      placeholder="Months left"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeEMI(index)}
                      className="w-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtsStep;

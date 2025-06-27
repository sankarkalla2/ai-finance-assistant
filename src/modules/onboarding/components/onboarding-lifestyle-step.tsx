import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';
import type { FormData } from '@/modules/onboarding/lib/onboarding-form-schema';

const LifestyleStep = () => {
  const { register, control, formState: { errors }, setValue } = useFormContext<FormData>();
  
  const { fields: purchaseFields, append: appendPurchase, remove: removePurchase } = useFieldArray({
    control,
    name: 'lifestyle.plannedPurchases',
  });

  const addPlannedPurchase = () => {
    appendPurchase({ item: '', estimatedCost: 0, timeline: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spending Behavior</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="spendingHabits">Spending Habits *</Label>
            <Select onValueChange={(value) => setValue('lifestyle.spendingHabits', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Describe your spending habits" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frugal">Frugal - Very careful with money</SelectItem>
                <SelectItem value="moderate">Moderate - Balanced spending</SelectItem>
                <SelectItem value="generous">Generous - Comfortable spending</SelectItem>
                <SelectItem value="extravagant">Extravagant - High spender</SelectItem>
              </SelectContent>
            </Select>
            {errors.lifestyle?.spendingHabits && (
              <p className="text-sm text-red-600">{errors.lifestyle.spendingHabits.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Car Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carType">Preferred Car Type</Label>
              <Select onValueChange={(value) => setValue('lifestyle.carPreferences.type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="convertible">Convertible</SelectItem>
                  <SelectItem value="pickup">Pickup Truck</SelectItem>
                  <SelectItem value="electric">Electric Vehicle</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newOrUsed">New or Used</Label>
              <Select onValueChange={(value) => setValue('lifestyle.carPreferences.newOrUsed', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="certified-pre-owned">Certified Pre-owned</SelectItem>
                  <SelectItem value="no-preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carBudget">Car Budget</Label>
              <Input
                id="carBudget"
                type="number"
                {...register('lifestyle.carPreferences.budget', { valueAsNumber: true })}
                placeholder="e.g., 25000"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandPreference">Brand Preference</Label>
              <Input
                id="brandPreference"
                {...register('lifestyle.carPreferences.brandPreference')}
                placeholder="e.g., Toyota, BMW, No preference"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="financingPreference">Financing Preference</Label>
              <Select onValueChange={(value) => setValue('lifestyle.carPreferences.financingPreference', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select financing preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash Purchase</SelectItem>
                  <SelectItem value="loan">Auto Loan</SelectItem>
                  <SelectItem value="lease">Lease</SelectItem>
                  <SelectItem value="undecided">Undecided</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Planned Major Purchases
            <Button type="button" onClick={addPlannedPurchase} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Purchase
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {purchaseFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No planned purchases added yet</p>
          ) : (
            <div className="space-y-4">
              {purchaseFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Item/Purchase</Label>
                    <Input
                      {...register(`lifestyle.plannedPurchases.${index}.item`)}
                      placeholder="e.g., Home renovation, Wedding"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Cost</Label>
                    <Input
                      type="number"
                      {...register(`lifestyle.plannedPurchases.${index}.estimatedCost`, { valueAsNumber: true })}
                      placeholder="e.g., 15000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timeline</Label>
                    <Input
                      {...register(`lifestyle.plannedPurchases.${index}.timeline`)}
                      placeholder="e.g., Next year, 6 months"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePurchase(index)}
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

export default LifestyleStep;

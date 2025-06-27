import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormData } from '@/modules/onboarding/lib/onboarding-form-schema';

const ExpensesStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Housing & Utilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="housing">Housing (Rent/Mortgage)</Label>
              <Input
                id="housing"
                type="number"
                {...register('expenses.housing', { valueAsNumber: true })}
                placeholder="e.g., 1500"
                className="w-full"
              />
              {errors.expenses?.housing && (
                <p className="text-sm text-red-600">{errors.expenses.housing.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="utilities">Utilities</Label>
              <Input
                id="utilities"
                type="number"
                {...register('expenses.utilities', { valueAsNumber: true })}
                placeholder="e.g., 200"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Electricity, water, gas, internet, phone</p>
              {errors.expenses?.utilities && (
                <p className="text-sm text-red-600">{errors.expenses.utilities.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance</Label>
              <Input
                id="insurance"
                type="number"
                {...register('expenses.insurance', { valueAsNumber: true })}
                placeholder="e.g., 300"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Health, life, auto, home insurance</p>
              {errors.expenses?.insurance && (
                <p className="text-sm text-red-600">{errors.expenses.insurance.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Living Expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="food">Food & Dining</Label>
              <Input
                id="food"
                type="number"
                {...register('expenses.food', { valueAsNumber: true })}
                placeholder="e.g., 600"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Groceries, dining out, delivery</p>
              {errors.expenses?.food && (
                <p className="text-sm text-red-600">{errors.expenses.food.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation</Label>
              <Input
                id="transportation"
                type="number"
                {...register('expenses.transportation', { valueAsNumber: true })}
                placeholder="e.g., 250"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Fuel, public transport, maintenance</p>
              {errors.expenses?.transportation && (
                <p className="text-sm text-red-600">{errors.expenses.transportation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthcare">Healthcare</Label>
              <Input
                id="healthcare"
                type="number"
                {...register('expenses.healthcare', { valueAsNumber: true })}
                placeholder="e.g., 150"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Medical expenses, prescriptions</p>
              {errors.expenses?.healthcare && (
                <p className="text-sm text-red-600">{errors.expenses.healthcare.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                type="number"
                {...register('expenses.education', { valueAsNumber: true })}
                placeholder="e.g., 200"
                className="w-full"
              />
              <p className="text-sm text-gray-600">School fees, courses, supplies</p>
              {errors.expenses?.education && (
                <p className="text-sm text-red-600">{errors.expenses.education.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="entertainment">Entertainment</Label>
              <Input
                id="entertainment"
                type="number"
                {...register('expenses.entertainment', { valueAsNumber: true })}
                placeholder="e.g., 150"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Subscriptions, hobbies, travel</p>
              {errors.expenses?.entertainment && (
                <p className="text-sm text-red-600">{errors.expenses.entertainment.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalCare">Personal Care</Label>
              <Input
                id="personalCare"
                type="number"
                {...register('expenses.personalCare', { valueAsNumber: true })}
                placeholder="e.g., 100"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Clothing, grooming, salon</p>
              {errors.expenses?.personalCare && (
                <p className="text-sm text-red-600">{errors.expenses.personalCare.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="childcare">Childcare</Label>
              <Input
                id="childcare"
                type="number"
                {...register('expenses.childcare', { valueAsNumber: true })}
                placeholder="e.g., 500"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Daycare, babysitting, support</p>
              {errors.expenses?.childcare && (
                <p className="text-sm text-red-600">{errors.expenses.childcare.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="miscellaneous">Miscellaneous</Label>
              <Input
                id="miscellaneous"
                type="number"
                {...register('expenses.miscellaneous', { valueAsNumber: true })}
                placeholder="e.g., 100"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Gifts, donations, unexpected</p>
              {errors.expenses?.miscellaneous && (
                <p className="text-sm text-red-600">{errors.expenses.miscellaneous.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesStep;

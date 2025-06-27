import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormData } from '@/modules/onboarding/lib/onboarding-form-schema';

const AssetsStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cash & Savings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cashSavings">Cash & Savings Accounts</Label>
              <Input
                id="cashSavings"
                type="number"
                {...register('assets.cashSavings', { valueAsNumber: true })}
                placeholder="e.g., 25000"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Checking, savings, emergency funds</p>
              {errors.assets?.cashSavings && (
                <p className="text-sm text-red-600">{errors.assets.cashSavings.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="liquidAssets">Liquid Assets</Label>
              <Input
                id="liquidAssets"
                type="number"
                {...register('assets.liquidAssets', { valueAsNumber: true })}
                placeholder="e.g., 15000"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Easily accessible funds</p>
              {errors.assets?.liquidAssets && (
                <p className="text-sm text-red-600">{errors.assets.liquidAssets.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investments & Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investments">Investments</Label>
              <Input
                id="investments"
                type="number"
                {...register('assets.investments', { valueAsNumber: true })}
                placeholder="e.g., 50000"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Stocks, bonds, 401(k), IRA, crypto</p>
              {errors.assets?.investments && (
                <p className="text-sm text-red-600">{errors.assets.investments.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="realEstate">Real Estate</Label>
              <Input
                id="realEstate"
                type="number"
                {...register('assets.realEstate', { valueAsNumber: true })}
                placeholder="e.g., 300000"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Home, rental properties, land</p>
              {errors.assets?.realEstate && (
                <p className="text-sm text-red-600">{errors.assets.realEstate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicles">Vehicles</Label>
              <Input
                id="vehicles"
                type="number"
                {...register('assets.vehicles', { valueAsNumber: true })}
                placeholder="e.g., 25000"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Cars, motorcycles, boats</p>
              {errors.assets?.vehicles && (
                <p className="text-sm text-red-600">{errors.assets.vehicles.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherAssets">Other Assets</Label>
              <Input
                id="otherAssets"
                type="number"
                {...register('assets.otherAssets', { valueAsNumber: true })}
                placeholder="e.g., 10000"
                className="w-full"
              />
              <p className="text-sm text-gray-600">Jewelry, art, collectibles</p>
              {errors.assets?.otherAssets && (
                <p className="text-sm text-red-600">{errors.assets.otherAssets.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetsStep;

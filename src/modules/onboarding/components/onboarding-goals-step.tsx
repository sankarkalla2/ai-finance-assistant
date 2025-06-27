import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';
import type { FormData } from '@/modules/onboarding/lib/onboarding-form-schema';

const GoalsStep = () => {
  const { register, control, formState: { errors }, setValue } = useFormContext<FormData>();
  
  const { fields: shortTermFields, append: appendShortTerm, remove: removeShortTerm } = useFieldArray({
    control,
    name: 'goals.shortTermGoals',
  });

  const { fields: longTermFields, append: appendLongTerm, remove: removeLongTerm } = useFieldArray({
    control,
    name: 'goals.longTermGoals',
  });

  const addShortTermGoal = () => {
    appendShortTerm({ description: '', targetAmount: 0, timeline: '', priority: 'medium' as const });
  };

  const addLongTermGoal = () => {
    appendLongTerm({ description: '', targetAmount: 0, timeline: '', priority: 'medium' as const });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Tolerance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="riskTolerance">Investment Risk Tolerance *</Label>
            <Select onValueChange={(value) => setValue('goals.riskTolerance', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your risk tolerance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative - Prefer safety over returns</SelectItem>
                <SelectItem value="moderate">Moderate - Balanced approach</SelectItem>
                <SelectItem value="aggressive">Aggressive - Higher risk for higher returns</SelectItem>
              </SelectContent>
            </Select>
            {errors.goals?.riskTolerance && (
              <p className="text-sm text-red-600">{errors.goals.riskTolerance.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Short-Term Goals (1-3 years)
            <Button type="button" onClick={addShortTermGoal} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {shortTermFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No short-term goals added yet</p>
          ) : (
            <div className="space-y-4">
              {shortTermFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Description</Label>
                    <Input
                      {...register(`goals.shortTermGoals.${index}.description`)}
                      placeholder="e.g., Emergency fund, Vacation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Amount</Label>
                    <Input
                      type="number"
                      {...register(`goals.shortTermGoals.${index}.targetAmount`, { valueAsNumber: true })}
                      placeholder="e.g., 10000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timeline</Label>
                    <Input
                      {...register(`goals.shortTermGoals.${index}.timeline`)}
                      placeholder="e.g., 2 years"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select onValueChange={(value) => setValue(`goals.shortTermGoals.${index}.priority`, value as 'high' | 'medium' | 'low')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end md:col-span-5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeShortTerm(index)}
                      className="ml-auto"
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
            Long-Term Goals (5+ years)
            <Button type="button" onClick={addLongTermGoal} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {longTermFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No long-term goals added yet</p>
          ) : (
            <div className="space-y-4">
              {longTermFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Description</Label>
                    <Input
                      {...register(`goals.longTermGoals.${index}.description`)}
                      placeholder="e.g., Retirement, Home purchase, Children's education"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Amount</Label>
                    <Input
                      type="number"
                      {...register(`goals.longTermGoals.${index}.targetAmount`, { valueAsNumber: true })}
                      placeholder="e.g., 500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timeline</Label>
                    <Input
                      {...register(`goals.longTermGoals.${index}.timeline`)}
                      placeholder="e.g., 20 years"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select onValueChange={(value) => setValue(`goals.longTermGoals.${index}.priority`, value as 'high' | 'medium' | 'low')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end md:col-span-5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLongTerm(index)}
                      className="ml-auto"
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

export default GoalsStep;

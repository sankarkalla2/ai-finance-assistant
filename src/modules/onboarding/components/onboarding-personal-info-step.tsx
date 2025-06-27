import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';
import type { FormData } from '@/modules/onboarding/lib/onboarding-form-schema';

const PersonalInfoStep = () => {
  const { register, control, formState: { errors }, setValue, watch } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'personalInfo.dependents',
  });

  const addDependent = () => {
    append({ name: '', age: 0, relationship: '' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...register('personalInfo.name')}
            placeholder="Enter your full name"
            className="w-full"
          />
          {errors.personalInfo?.name && (
            <p className="text-sm text-red-600">{errors.personalInfo.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            {...register('personalInfo.age', { valueAsNumber: true })}
            placeholder="Enter your age"
            className="w-full"
          />
          {errors.personalInfo?.age && (
            <p className="text-sm text-red-600">{errors.personalInfo.age.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender (Optional)</Label>
          <Select onValueChange={(value) => setValue('personalInfo.gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status *</Label>
          <Select onValueChange={(value) => setValue('personalInfo.maritalStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select marital status" defaultValue={} />
            </SelectTrigger >
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
              <SelectItem value="separated">Separated</SelectItem>
            </SelectContent>
          </Select>
          {errors.personalInfo?.maritalStatus && (
            <p className="text-sm text-red-600">{errors.personalInfo.maritalStatus.message}</p>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="location">Location (City, State/Country) *</Label>
          <Input
            id="location"
            {...register('personalInfo.location')}
            placeholder="e.g., New York, NY, USA"
            className="w-full"
          />
          {errors.personalInfo?.location && (
            <p className="text-sm text-red-600">{errors.personalInfo.location.message}</p>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Dependents
            <Button type="button" onClick={addDependent} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Dependent
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No dependents added yet</p>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor={`dependent-name-${index}`}>Name</Label>
                    <Input
                      id={`dependent-name-${index}`}
                      {...register(`personalInfo.dependents.${index}.name`)}
                      placeholder="Dependent's name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`dependent-age-${index}`}>Age</Label>
                    <Input
                      id={`dependent-age-${index}`}
                      type="number"
                      {...register(`personalInfo.dependents.${index}.age`, { valueAsNumber: true })}
                      placeholder="Age"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`dependent-relationship-${index}`}>Relationship</Label>
                    <Select onValueChange={(value) => setValue(`personalInfo.dependents.${index}.relationship`, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
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

export default PersonalInfoStep;

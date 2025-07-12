"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { OnboardedUserType } from "../types";
import { useOnboarduser } from "../hooks/use-onboard-user";
import { contentVariants, fadeInUp } from "../lib/onboarding-motion-fields";
import { Controller } from "react-hook-form";
import LocationSelector from "@/components/ui/location-input";

const FinancialPlanningForm = (userInfo: OnboardedUserType) => {
  const {
    currentStep,
    setCurrentStep,
    onSubmit,
    handleSubmit,
    control,
    errors,
    appendDebt,
    debtFields,
    removeDebt,
    appendGoal,
    goalFields,
    removeGoal,
    appendPurchase,
    purchaseFields,
    removePurchase,
    prevStep,
    nextStep,
    isStepValid,
    steps,
    methods,
    isSubmitting,
  } = useOnboarduser(userInfo);

  const handleCountryChange = (value: string) => {
    methods.setValue("personalInfo.country", value, { shouldValidate: true });
  };

  const handleStateChange = (value: string) => {
    methods.setValue("personalInfo.state", value, { shouldValidate: true });
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      {/* Progress indicator */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className={cn(
                  "w-4 h-4 rounded-full cursor-pointer transition-colors duration-300",
                  index < currentStep
                    ? "bg-primary"
                    : index === currentStep
                    ? "bg-primary ring-4 ring-primary/20"
                    : "bg-muted"
                )}
                onClick={() => {
                  if (index <= currentStep) {
                    setCurrentStep(index);
                  }
                }}
                whileTap={{ scale: 0.95 }}
              />
              {/* <motion.span
                className={cn(
                  "text-xs mt-1.5 hidden sm:block text-center",
                  index === currentStep
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </motion.span> */}
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border shadow-md rounded-3xl overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Let&apos;s start with your basic details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div
                        variants={fadeInUp}
                        className="space-y-2 mt-4"
                      >
                        <Label htmlFor="name">Full Name</Label>
                        <Controller
                          name="personalInfo.name"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="name"
                              placeholder="Enter your full name"
                              className={cn(
                                "transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                errors.personalInfo?.name && "border-red-500"
                              )}
                            />
                          )}
                        />
                        {errors.personalInfo?.name && (
                          <p className="text-sm text-red-500">
                            {errors.personalInfo.name.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Controller
                          name="personalInfo.age"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="age"
                              type="number"
                              placeholder="Enter your age"
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0
                                )
                              }
                              className={cn(
                                "transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                errors.personalInfo?.age && "border-red-500"
                              )}
                            />
                          )}
                        />
                        {errors.personalInfo?.age && (
                          <p className="text-sm text-red-500">
                            {errors.personalInfo.age.message}
                          </p>
                        )}
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Controller
                            name="personalInfo.country"
                            control={control}
                            render={({ field }) => (
                              <LocationSelector
                                value={{
                                  country: methods.getValues(
                                    "personalInfo.country"
                                  ),
                                  state:
                                    methods.getValues("personalInfo.state"),
                                }}
                                onCountryChange={(country) => {
                                  field.onChange(country?.name || "");
                                  methods.setValue("personalInfo.state", "");
                                }}
                                onStateChange={(state) => {
                                  methods.setValue(
                                    "personalInfo.state",
                                    state?.name || ""
                                  );
                                }}
                              />
                            )}
                          />
                        </motion.div>

                        {/* <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Controller
                            name="personalInfo.state"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="state"
                                placeholder="State"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div> */}
                      </div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="dependents">Number of Dependents</Label>
                        <Controller
                          name="personalInfo.dependents"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="dependents"
                              type="number"
                              placeholder="0"
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0
                                )
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          )}
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 2: Income Details */}
                {currentStep === 1 && (
                  <>
                    <CardHeader>
                      <CardTitle>Income Details</CardTitle>
                      <CardDescription>
                        Tell us about your income sources
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="monthlyIncome">Monthly Income</Label>
                          <Controller
                            name="income.monthlyIncome"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="monthlyIncome"
                                type="number"
                                placeholder="Enter your monthly income"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="sideIncome">
                            Extra Income
                            <span className="text-sm text-muted-foreground">
                              (side hustles, rental, etc)
                            </span>
                          </Label>
                          <Controller
                            name="income.extraIncome"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="sideIncome"
                                type="number"
                                placeholder="Enter your side income"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                          {errors.income?.extraIncome && (
                            <p className="text-sm text-red-500">
                              {errors.income.extraIncome.message}
                            </p>
                          )}
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="occupation">Occupation</Label>
                          <Controller
                            name="income.occupation"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="occupation"
                                placeholder="Enter your occupation"
                                className={cn(
                                  "transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                  errors.income?.occupation && "border-red-500"
                                )}
                              />
                            )}
                          />
                          {errors.income?.occupation && (
                            <p className="text-sm text-red-500">
                              {errors.income.occupation.message}
                            </p>
                          )}
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2 ">
                          <Label htmlFor="Job Stability">Job Stability</Label>
                          <Controller
                            name="income.jobStability"
                            control={control}
                            render={({ field }) => (
                              <Select {...field} onValueChange={field.onChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Job Stability" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={"stable"}>
                                    Stable
                                  </SelectItem>
                                  <SelectItem value={"contract"}>
                                    Contract
                                  </SelectItem>
                                  <SelectItem value={"freelance"}>
                                    Freelance
                                  </SelectItem>
                                  <SelectItem value={"seasonal"}>
                                    Seasonal
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />

                          {errors.income?.jobStability && (
                            <p className="text-sm text-red-500">
                              {errors.income.jobStability.message}
                            </p>
                          )}
                        </motion.div>
                      </div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Income Frequency</Label>
                        <Controller
                          name="income.incomeFrequency"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="space-y-2"
                            >
                              {[
                                { value: "weekly", label: "Weekly" },
                                { value: "monthly", label: "Monthly" },
                                { value: "yearly", label: "Yearly" },
                              ].map((freq) => (
                                <div
                                  key={freq.value}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={freq.value}
                                    id={freq.value}
                                  />
                                  <Label htmlFor={freq.value}>
                                    {freq.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 3: Monthly Expenses */}
                {currentStep === 2 && (
                  <>
                    <CardHeader>
                      <CardTitle>Monthly Expenses</CardTitle>
                      <CardDescription>
                        Break down your monthly spending
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="totalMonthlyExpenses">
                          Total Monthly Expenses
                        </Label>
                        <Controller
                          name="expenses.totalMonthlyExpenses"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="totalMonthlyExpenses"
                              type="number"
                              placeholder="Total monthly expenses"
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseFloat(e.target.value) || 0
                                )
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          )}
                        />
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="housing">Housing</Label>
                          <Controller
                            name="expenses.housing"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="housing"
                                type="number"
                                placeholder="Housing costs"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="transportation">Transportation</Label>
                          <Controller
                            name="expenses.transportation"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="transportation"
                                type="number"
                                placeholder="Transportation costs"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="food">Food</Label>
                          <Controller
                            name="expenses.food"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="food"
                                type="number"
                                placeholder="Food expenses"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="subscriptions">Subscriptions</Label>
                          <Controller
                            name="expenses.subscriptions"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="subscriptions"
                                type="number"
                                placeholder="Subscription costs"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="food">Education</Label>
                          <Controller
                            name="expenses.education"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="education"
                                type="number"
                                placeholder="Education expenses"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="subscriptions">Miscallaneous</Label>
                          <Controller
                            name="expenses.miscallaneous"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="miscallaneous"
                                type="number"
                                placeholder="Miscallaneous costs"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>
                      </div>
                    </CardContent>
                  </>
                )}

                {/* Step 4: Debts & Credit */}
                {currentStep === 3 && (
                  <>
                    <CardHeader>
                      <CardTitle>Debts & Credit</CardTitle>
                      <CardDescription>
                        Information about your debts and credit score
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="totalDebt">Total Debt</Label>
                        <Controller
                          name="debts.totalDebt"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="totalDebt"
                              type="number"
                              placeholder="Total outstanding debt"
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseFloat(e.target.value) || 0
                                )
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          )}
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="monthlyDebtPayment">
                          Monthly Debt Payment
                        </Label>
                        <Controller
                          name="debts.monthlyDebtPayment"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="monthlyDebtPayment"
                              type="number"
                              placeholder="Monthly debt payments"
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseFloat(e.target.value) || 0
                                )
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          )}
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="creditScore">Credit Score</Label>
                        <Controller
                          name="debts.creditScore"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="creditScore"
                              type="number"
                              placeholder="Credit score (300-850)"
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value) || 0
                                )
                              }
                              className={cn(
                                "transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                errors.debts?.creditScore && "border-red-500"
                              )}
                            />
                          )}
                        />
                        {errors.debts?.creditScore && (
                          <p className="text-sm text-red-500">
                            {errors.debts.creditScore.message}
                          </p>
                        )}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="debt-breakdown">
                              Debt Breakdown
                            </Label>
                            <Button
                              variant="outline"
                              type="button"
                              size="sm"
                              onClick={() =>
                                appendDebt({
                                  type: "credit_card",
                                  totalDebt: 0,
                                  balance: 0,
                                })
                              }
                            >
                              <Plus className="h-4 w-4 mr-1" /> Add Debt
                            </Button>
                          </div>
                          {debtFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="border rounded-lg p-4 space-y-3 mt-3"
                            >
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">
                                  Debt {index + 1}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDebt(index)}
                                  aria-label={`Remove Debt ${index + 1}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <Controller
                                  name={`debts.deptBreakDown.${index}.type`} // Corrected path
                                  control={control}
                                  render={({ field }) => (
                                    <div className="space-y-2">
                                      <Label>Type</Label>
                                      <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                      >
                                        <SelectTrigger aria-label="Debt Type">
                                          <SelectValue placeholder="Select Debt Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="credit_card">
                                            Credit Card
                                          </SelectItem>
                                          <SelectItem value="mortgage">
                                            Mortgage
                                          </SelectItem>
                                          <SelectItem value="student_loan">
                                            Student Loan
                                          </SelectItem>
                                          <SelectItem value="car_loan">
                                            Car Loan
                                          </SelectItem>
                                          <SelectItem value="personal_loan">
                                            Personal Loan
                                          </SelectItem>
                                          <SelectItem value="other">
                                            Other
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  )}
                                />
                                <Controller
                                  name={`debts.deptBreakDown.${index}.totalDebt`} // Corrected path
                                  control={control}
                                  rules={{
                                    min: 0,
                                    required: "Amount is required",
                                  }}
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <div className="space-y-2">
                                      <Label htmlFor="amount">Amount</Label>
                                      <Input
                                        {...field}
                                        type="number"
                                        placeholder="Amount"
                                        aria-label={`Debt ${index + 1} Amount`}
                                        onChange={(e) =>
                                          field.onChange(
                                            Number.parseFloat(e.target.value) ||
                                              0
                                          )
                                        }
                                      />
                                      {error && (
                                        <span className="text-red-500 text-sm">
                                          {error.message}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <Controller
                                  name={`debts.deptBreakDown.${index}.balance`} // Corrected path
                                  control={control}
                                  rules={{
                                    min: 0,
                                    required: "Balance is required",
                                  }}
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <div className="space-y-2">
                                      <Label>Balance</Label>
                                      <Input
                                        {...field}
                                        type="number"
                                        placeholder="Balance"
                                        aria-label={`Debt ${index + 1} Balance`}
                                        onChange={(e) =>
                                          field.onChange(
                                            Number.parseFloat(e.target.value) ||
                                              0
                                          )
                                        }
                                      />
                                      {error && (
                                        <span className="text-red-500 text-sm">
                                          {error.message}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 5: Assets & Savings */}
                {currentStep === 4 && (
                  <>
                    <CardHeader>
                      <CardTitle>Assets & Savings</CardTitle>
                      <CardDescription>
                        Tell us about your current assets
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="cashSavings">Cash Savings</Label>
                          <Controller
                            name="assets.cashSavings"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="cashSavings"
                                type="number"
                                placeholder="Cash savings"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="investments">Investments</Label>
                          <Controller
                            name="assets.investments"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="investments"
                                type="number"
                                placeholder="Investment value"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="retirementSavings">
                            Retirement Savings
                          </Label>
                          <Controller
                            name="assets.retirementSavings"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="retirementSavings"
                                type="number"
                                placeholder="Retirement savings"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="realEstateValue">
                            Real Estate Value
                          </Label>
                          <Controller
                            name="assets.realEstateValue"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="realEstateValue"
                                type="number"
                                placeholder="Real estate value"
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                            )}
                          />
                        </motion.div>
                      </div>
                    </CardContent>
                  </>
                )}

                {/* Step 6: Financial Goals */}
                {currentStep === 5 && (
                  <>
                    <CardHeader>
                      <CardTitle>Financial Goals</CardTitle>
                      <CardDescription>
                        Set your financial objectives
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Financial Goals</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              appendGoal({
                                description: "",
                                targetAmount: 0,
                                timeline: "",
                                priority: "medium",
                              })
                            }
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Goal
                          </Button>
                        </div>
                        {goalFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="border rounded-lg p-4 space-y-3"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Goal {index + 1}</h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeGoal(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <Controller
                                name={`goals.goals.${index}.description`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    placeholder="Goal description"
                                  />
                                )}
                              />
                              <Controller
                                name={`goals.goals.${index}.targetAmount`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="Target amount"
                                    onChange={(e) =>
                                      field.onChange(
                                        Number.parseFloat(e.target.value) || 0
                                      )
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <Controller
                                name={`goals.goals.${index}.timeline`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    placeholder="Timeline (e.g., 5 years)"
                                  />
                                )}
                              />
                              <Controller
                                name={`goals.goals.${index}.priority`}
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="medium">
                                        Medium
                                      </SelectItem>
                                      <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Risk Tolerance</Label>
                        <Controller
                          name="goals.riskTolerance"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex space-x-6"
                            >
                              {[
                                { value: "low", label: "Low" },
                                { value: "medium", label: "Medium" },
                                { value: "high", label: "High" },
                              ].map((risk) => (
                                <div
                                  key={risk.value}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={risk.value}
                                    id={risk.value}
                                  />
                                  <Label htmlFor={risk.value}>
                                    {risk.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="retirementAge">Retirement Age</Label>
                        <Controller
                          name="goals.retirementAge"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="retirementAge"
                              type="number"
                              placeholder="Desired retirement age"
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value) || 60
                                )
                              }
                              className={cn(
                                "transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                errors.goals?.retirementAge && "border-red-500"
                              )}
                            />
                          )}
                        />
                        {errors.goals?.retirementAge && (
                          <p className="text-sm text-red-500">
                            {errors.goals.retirementAge.message}
                          </p>
                        )}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 7: Emergency Fund & Lifestyle */}
                {currentStep === 6 && (
                  <>
                    <CardHeader>
                      <CardTitle>Emergency Fund & Lifestyle</CardTitle>
                      <CardDescription>
                        Final details about your financial situation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="monthsCovered">
                          Emergency Fund (Months Covered)
                        </Label>
                        <Controller
                          name="emergencyFund.monthsCovered"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="monthsCovered"
                              type="number"
                              placeholder="Number of months your emergency fund covers"
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseFloat(e.target.value) || 0
                                )
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          )}
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Spending Habits</Label>
                        <Controller
                          name="lifestyle.spendingHabits"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="space-y-2"
                            >
                              {[
                                {
                                  value: "conservative",
                                  label:
                                    "Conservative - I save most of my income",
                                },
                                {
                                  value: "average",
                                  label:
                                    "Average - I balance saving and spending",
                                },
                                {
                                  value: "liberal",
                                  label: "Liberal - I spend most of my income",
                                },
                              ].map((habit) => (
                                <div
                                  key={habit.value}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={habit.value}
                                    id={habit.value}
                                  />
                                  <Label htmlFor={habit.value}>
                                    {habit.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Planned Big Purchases</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendPurchase({ description: "" })}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Purchase
                          </Button>
                        </div>
                        {purchaseFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="flex items-center space-x-2"
                          >
                            <Controller
                              name={`lifestyle.plannedBigPurchases.${index}.description`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Planned purchase (e.g., Car, House)"
                                />
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removePurchase(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type={"button"}
                  onClick={
                    currentStep === steps.length - 1
                      ? handleSubmit(onSubmit)
                      : nextStep
                  }
                  disabled={!isStepValid() || isSubmitting}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Submit" : "Next"}
                      {currentStep === steps.length ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        className="mt-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.div>
    </div>
  );
};

export default FinancialPlanningForm;

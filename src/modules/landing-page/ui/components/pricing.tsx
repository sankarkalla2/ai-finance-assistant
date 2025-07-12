"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  getAllSubscriptions,
  getUserCurrentActiveSubscription,
} from "@/modules/upgrade/server/upgrade";
import { useQuery } from "@tanstack/react-query";
import { CircleCheck, CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Types
interface PlanFeature {
  title: string;
  tooltip?: string;
}

interface Plan {
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  isRecommended?: boolean;
  isPopular?: boolean;
}

interface AuthButton {
  interval: string;
  id: string;
  buttonText: string;
  onClick: () => void;
}

type BillingPeriod = "month" | "year";

// Constants
const YEARLY_DISCOUNT = 15;

const PLANS: Plan[] = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started with AI financial guidance",
    features: [
      { title: "Financial Data Entry" },
      { title: "5 AI Questions per Month" },
      { title: "Secure Data Storage" },
      { title: "Preview questions based on financial data" },
      { title: "Email Support" },
    ],
    buttonText: "Get Started",
  },
  {
    name: "Advanced",
    price: 10,
    isRecommended: true,
    description:
      "Advanced AI financial advisor with unlimited access to GPT-4.5",
    features: [
      { title: "Unlimited AI Conversations" },
      { title: "Smart Question Generation" },
      { title: "Secure Data Storage" },
      { title: "Investment Guidance" },
      { title: "Priority Support" },
    ],
    buttonText: "Get 50 portraits in 3 hours",
    isPopular: true,
  },
];

// Utility functions
const calculateYearlyPrice = (monthlyPrice: number): number => {
  return monthlyPrice * ((100 - YEARLY_DISCOUNT) / 100);
};

const getDisplayPrice = (
  price: number,
  billingPeriod: BillingPeriod
): number => {
  return billingPeriod === "month" ? price : calculateYearlyPrice(price);
};

// Custom hooks
const usePricingData = () => {
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["get-subscriptions"],
    queryFn: getAllSubscriptions,
  });

  const { data: currentSubscription, isLoading: isLoadingSubscription } =
    useQuery({
      queryKey: ["get-active-user-subscription"],
      queryFn: getUserCurrentActiveSubscription,
    });

  return {
    products,
    currentSubscription,
    isLoading: isLoadingProducts || isLoadingSubscription,
  };
};

const useAuthButtons = (
  products: any[],
  currentSubscription: any
): AuthButton[] => {
  return (
    products?.map((product) => {
      const hasActiveSubscription = !!currentSubscription;

      return {
        interval: product.recurringInterval,
        id: product.id,
        buttonText: hasActiveSubscription
          ? "Manage Subscription"
          : "Upgrade to Pro",
        onClick: hasActiveSubscription
          ? () => authClient.customer.portal()
          : () => authClient.checkout({ products: [product.id] }),
      };
    }) || []
  );
};

// Components
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        <div className="absolute inset-0 animate-pulse rounded-full h-12 w-12 border-4 border-transparent border-t-blue-400 animate-reverse-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-slate-700">
          Loading pricing plans...
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Preparing your financial journey
        </p>
      </div>
    </div>
  </div>
);

const BillingPeriodSelector = ({
  selectedPeriod,
  onPeriodChange,
}: {
  selectedPeriod: BillingPeriod;
  onPeriodChange: (period: BillingPeriod) => void;
}) => (
  <Tabs
    value={selectedPeriod}
    onValueChange={() =>
      onPeriodChange(selectedPeriod === "month" ? "year" : "month")
    }
    className="mt-8"
  >
    <TabsList className="h-11 px-1.5 rounded-full">
      <TabsTrigger value="month" className="py-1.5 rounded-full">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="year" className="py-1.5 rounded-full">
        Yearly (Save {YEARLY_DISCOUNT}%)
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

const PlanFeatureList = ({ features }: { features: PlanFeature[] }) => (
  <ul className="space-y-2">
    {features.map((feature) => (
      <li key={feature.title} className="flex items-start gap-1.5">
        <CircleCheck className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
        <span className="text-sm">{feature.title}</span>
        {feature.tooltip && (
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              <CircleHelp className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent>{feature.tooltip}</TooltipContent>
          </Tooltip>
        )}
      </li>
    ))}
  </ul>
);

const PlanCard = ({
  plan,
  billingPeriod,
  authButton,
  isAuthenticated,
  onSignInRedirect,
  isLoading,
}: {
  plan: Plan;
  billingPeriod: BillingPeriod;
  authButton?: AuthButton;
  isAuthenticated: boolean;
  isLoading: boolean;
  onSignInRedirect: () => void;
}) => {
  const displayPrice = getDisplayPrice(plan.price, billingPeriod);
  const isFree = plan.name === "Free";

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      onSignInRedirect();
      return;
    }

    if (isFree) {
      // Handle free plan logic
      return;
    }

    authButton?.onClick();
  };

  const getButtonText = () => {
    if (isFree) return "Get Started";
    return authButton?.buttonText || "Upgrade to Pro";
  };

  return (
    <div
      className={cn(
        "relative border rounded-xl p-6 transition-all duration-200 hover:shadow-lg",
        {
          "border-[2px] border-primary py-10 shadow-md": plan.isPopular,
        }
      )}
    >
      {plan.isPopular && (
        <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
          Most Popular
        </Badge>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{plan.name}</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-4xl font-bold">${displayPrice}</span>
            <span className="ml-1.5 text-sm text-muted-foreground font-normal">
              /month
            </span>
          </div>
        </div>

        <p className="font-medium text-muted-foreground">{plan.description}</p>

        <Button
          variant={plan.isPopular ? "default" : "outline"}
          size="lg"
          className="w-full"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {getButtonText()}
        </Button>
      </div>

      <Separator className="my-8" />

      <PlanFeatureList features={plan.features} />
    </div>
  );
};

const PricingHeader = () => (
  <div className="text-center space-y-4">
    <h1 className="text-5xl font-bold tracking-tight">Pricing</h1>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      Choose the perfect plan for your financial journey
    </p>
  </div>
);

// Main component
const Pricing = () => {
  const session = authClient.useSession();
  const router = useRouter();
  const [selectedBillingPeriod, setSelectedBillingPeriod] =
    useState<BillingPeriod>("year");

  const { products, currentSubscription, isLoading } = usePricingData();
  const authButtons = useAuthButtons(products || [], currentSubscription);

  const isAuthenticated = !!session.data?.user;

  const handleSignInRedirect = () => {
    router.push("/sign-in");
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-6"
      id="pricing"
    >
      <PricingHeader />

      <BillingPeriodSelector
        selectedPeriod={selectedBillingPeriod}
        onPeriodChange={setSelectedBillingPeriod}
      />

      <div className="mt-12 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch gap-8">
        {PLANS.map((plan) => {
          const currentAuthButton = authButtons.find(
            (button) => button.interval === selectedBillingPeriod
          );

          return (
            <PlanCard
              key={plan.name}
              plan={plan}
              billingPeriod={selectedBillingPeriod}
              authButton={currentAuthButton}
              isAuthenticated={isAuthenticated}
              onSignInRedirect={handleSignInRedirect}
              isLoading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;

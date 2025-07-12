"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAllSubscriptions,
  getUserCurrentActiveSubscription,
} from "../../server/upgrade";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Crown,
  Sparkles,
  Calculator,
  TrendingUp,
  Shield,
  Mail,
  RefreshCw,
  Target,
  Brain,
  Zap,
  Users,
  BarChart3,
  PiggyBank,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Pricing from "@/modules/landing-page/ui/components/pricing";

const UpgradeView = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["get-subscriptions"],
    queryFn: () => getAllSubscriptions(),
  });

  const { data: currenSubscription } = useQuery({
    queryKey: ["get-active-user-subscription"],
    queryFn: () => getUserCurrentActiveSubscription(),
  });

  if (isLoading) {
    return (
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
  }

  const freeFeatures = [
    {
      icon: <Calculator className="h-4 w-4" />,
      title: "Financial Data Entry",
      description:
        "Full financial data entry—track all your income, expenses, debts, and savings",
    },
    {
      icon: <Brain className="h-4 w-4" />,
      title: "5 AI Questions per Month",
      description: "Limited Q&A responses powered by GPT-3.5 Turbo",
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      title: "Static Financial Overview",
      description: "Basic pie chart visualization and general budgeting tips",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Secure Data Storage",
      description:
        "Bank-level encryption with option to delete your data anytime",
    },
    {
      icon: <Mail className="h-4 w-4" />,
      title: "Email Support",
      description: "Standard email support within 48-72 hours",
    },
  ];

  const proFeatures = [
    {
      icon: <Calculator className="h-4 w-4" />,
      title: "Financial Data Entry",
      description:
        "Full financial data entry—track all your income, expenses, debts, and savings",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Unlimited AI Conversations",
      description:
        "Unlimited questions with GPT-4o for comprehensive financial guidance",
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      title: "Advanced Analytics & Insights",
      description:
        "Dynamic charts, spending patterns, investment recommendations, and cash flow analysis",
    },
    // {
    //   icon: <Target className="h-4 w-4" />,
    //   title: "Personalized Financial Goals",
    //   description: "Custom goal tracking for retirement, emergency funds, debt payoff, and major purchases"
    // },
    // {
    //   icon: <RefreshCw className="h-4 w-4" />,
    //   title: "Real-time Data Updates",
    //   description: "Update your financial profile anytime with instant recalculations and new recommendations"
    // },
    // {
    //   icon: <AlertTriangle className="h-4 w-4" />,
    //   title: "Financial Risk Assessment",
    //   description: "Identify potential financial risks and get proactive advice to avoid common pitfalls"
    // },
    // {
    //   icon: <PiggyBank className="h-4 w-4" />,
    //   title: "Tax Optimization Strategies",
    //   description: "AI-powered suggestions for tax-efficient investing and deduction opportunities"
    // },
    // {
    //   icon: <Wallet className="h-4 w-4" />,
    //   title: "Debt Payoff Optimization",
    //   description: "Smart strategies comparing avalanche vs. snowball methods with projected timelines"
    // },
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Secure Data Storage",
      description:
        "Bank-level encryption with option to delete your data anytime",
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Priority Support",
      description: "Priority email support with 12-hour response time",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <Pricing />
        {/* Feature Comparison */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Compare Plans
            </h2>
            <p className="text-slate-600">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
            <div className="grid grid-cols-3 gap-px bg-slate-200">
              <div className="bg-white p-6">
                <h3 className="font-semibold text-slate-800">Features</h3>
              </div>
              <div className="bg-slate-50 p-6 text-center">
                <h3 className="font-semibold text-slate-800">Free</h3>
              </div>
              <div className="bg-blue-50 p-6 text-center">
                <h3 className="font-semibold text-blue-800">Pro</h3>
              </div>
            </div>

            {[
              {
                feature: "AI Questions per Month",
                free: "5",
                pro: "Unlimited",
              },
              { feature: "AI Model", free: "GPT-3.5", pro: "GPT-4o" },
              {
                feature: "Financial Data Entry",
                free: "Basic",
                pro: "Advanced + Real-time Updates",
              },
              {
                feature: "Visualizations",
                free: "Static Charts",
                pro: "Dynamic Analytics",
              },
              { feature: "Goal Tracking", free: "❌", pro: "✅ Custom Goals" },
              { feature: "Risk Assessment", free: "❌", pro: "✅ AI-Powered" },
              {
                feature: "Tax Optimization",
                free: "❌",
                pro: "✅ Advanced Strategies",
              },
              {
                feature: "Support Response Time",
                free: "48-72 hours",
                pro: "12 hours + Live Chat",
              },
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-3 gap-px bg-slate-200">
                <div className="bg-white p-4">
                  <span className="text-sm text-slate-700">{row.feature}</span>
                </div>
                <div className="bg-slate-50 p-4 text-center">
                  <span className="text-sm text-slate-600">{row.free}</span>
                </div>
                <div className="bg-blue-50 p-4 text-center">
                  <span className="text-sm text-blue-700 font-medium">
                    {row.pro}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-8 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Shield className="h-4 w-4 text-green-600" />
              Bank-level security
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <RefreshCw className="h-4 w-4 text-blue-600" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4 text-purple-600" />
              10,000+ users trust us
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeView;

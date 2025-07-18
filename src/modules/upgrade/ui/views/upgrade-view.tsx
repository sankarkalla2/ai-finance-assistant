"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAllSubscriptions,
  getUserCurrentActiveSubscription,
} from "../../server/upgrade";

import {
  Calculator,
  TrendingUp,
  Shield,
  Mail,
  RefreshCw,
  Brain,
  Zap,
  Users,
  BarChart3,
} from "lucide-react";
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
              { feature: "AI Model", free: "GPT-4.0 mini", pro: "GPT-4.1" },
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

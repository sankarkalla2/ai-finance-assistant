import {
  Blocks,
  Bot,
  BotMessageSquare,
  ChartPie,
  Film,
  MessageCircle,
  MonitorSmartphone,
  PiggyBank,
  Settings2,
  Shield,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: BotMessageSquare,
    title: "AI-Powered Insights",
    description:
      "Get intelligent answers to your financial questions. Ask anything from 'Can I afford a new car?' to ' What's my best investment strategy?'",
  },
  {
    icon: PiggyBank,
    title: "Investment Guidance",
    description:
      "Receive tailored investment strategies based on your risk tolerance, goals, and current financial situation.",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your financial data is protected with enterprise-grade encryption and security protocols.",
  },
  {
    icon: MonitorSmartphone,
    title: "24/7 Availability",
    description:
      "Access your AI finance assistant anytime, anywhere. Get instant answers to your money questions.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12" id="features">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
          Unleash Your Creativity
        </h2>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border rounded-xl py-6 px-5"
            >
              <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

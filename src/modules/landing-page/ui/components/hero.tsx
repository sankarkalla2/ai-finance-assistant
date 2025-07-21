"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center px-6 py-16">
      <div className="text-center max-w-2xl md:max-w-3xl">
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
          Just released v1.0.0
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Take Control of Your Money, Not Just Track It
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Make smarter financial decisions with AI that understands your money.
          Get personalized insights, budgeting help, and investment strategies
          tailored just for you
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base" asChild>
            <Link href={"/chat"}>
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Link>
          </Button>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          No credit card required. Cancel anytime.
        </p>
      </div>
      <div className="w-full relative max-w-screen-xl mx-auto aspect-video bg-accent rounded-xl border border-muted/20 overflow-hidden">
        <Image
          src={theme === "dark" ? "/dark-theme.png" : "/light-theme.png"}
          fill
          alt="logo"
          loading="lazy"
          className="aspect-video rounded-md"
        />
      </div>
    </div>
  );
};

export default Hero;

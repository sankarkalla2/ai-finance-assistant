import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-logo",
});

interface LogoProps {
  variant?: "sm" | "md";
  showOnlyLogo?: boolean;
}
export const Logo = ({ variant, showOnlyLogo = false }: LogoProps) => {
  return (
    <div
      className={cn(
        `flex items-center space-x-2 ${
          spaceGrotesk.className
        } text-primary ${variant === "sm" ? "text-lg " : "text-2xl"} `
      )}
    >
      {/* Simple chatbot/AI icon */}
      <Image
        src={"/logo.png"}
        width={variant === "sm" ? 23 : 27}
        height={variant === "sm" ? 23 : 27}
        alt="Logo"
        className="rounded-md shadow-sm"
      />
      {!showOnlyLogo && (
        <span className="font-bold tracking-tight hidden md:flex">
          AskYourFinance
        </span>
      )}
    </div>
  );
};

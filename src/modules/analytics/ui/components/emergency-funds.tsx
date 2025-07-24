import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyFundStatusProps {
  emergencyFundStatus: {
    monthlyExpenses: number; // Monthly expenses in dollars
    emergencyFundMonthsCovered: number; // Number of months the emergency fund covers
    recommendedFund: number; // Recommended months of expenses to cover
    currentEmergencyFund: number; // Current emergency fund amount
    progress: number;
  };
}
export function EmergencyFundStatus({
  emergencyFundStatus,
}: EmergencyFundStatusProps) {
  const getStatusInfo = () => {
    if (emergencyFundStatus.emergencyFundMonthsCovered >= 6) {
      return {
        status: "Excellent",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        iconColor: "text-green-600",
        message:
          "Your emergency fund exceeds the recommended 6 months of expenses.",
      };
    } else if (emergencyFundStatus.emergencyFundMonthsCovered >= 3) {
      return {
        status: "Good",
        color: "bg-yellow-100 text-yellow-800",
        icon: AlertCircle,
        iconColor: "text-yellow-600",
        message:
          "You have a solid emergency fund. Consider building it to 6 months.",
      };
    } else {
      return {
        status: "Needs Attention",
        color: "bg-red-100 text-red-800",
        icon: AlertCircle,
        iconColor: "text-red-600",
        message:
          "Your emergency fund is below the recommended minimum of 3 months.",
      };
    }
  };

  const statusInfo = getStatusInfo();
  const shortfall = Math.max(
    0,
    emergencyFundStatus.recommendedFund -
      emergencyFundStatus.currentEmergencyFund
  );

  return (
    <Card className="w-full max-w-md md:*:max-w-lg lg:max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Emergency Fund Status</span>
        </CardTitle>
        <CardDescription>
          Financial safety net analysis and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <statusInfo.icon className={`h-4 w-4 ${statusInfo.iconColor}`} />
            <span className="font-medium">Status</span>
          </div>
          <Badge className={statusInfo.color}>{statusInfo.status}</Badge>
        </div>
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to 6-month goal</span>
            <span>{emergencyFundStatus.progress.toFixed(1)}%</span>
          </div>
          <Progress
            value={Math.min(emergencyFundStatus.progress, 100)}
            className="h-3 max-w-screen"
          />
        </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Fund</p>
            <p className="text-xl font-bold">
              ${emergencyFundStatus.currentEmergencyFund.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {emergencyFundStatus.emergencyFundMonthsCovered.toFixed(1)} months
              covered
            </p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Recommended</p>
            <p className="text-xl font-bold">
              ${emergencyFundStatus.recommendedFund.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              6 months of expenses
            </p>
          </div>
        </div>
        {/* Status Message and Recommendations */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">{statusInfo.message}</p>
          {shortfall > 0 && (
            <div className="text-sm text-blue-700">
              <p className="font-medium">To reach your goal:</p>
              <ul className="mt-1 space-y-1">
                <li>• Save an additional ${shortfall.toLocaleString()}</li>
                <li>
                  • Monthly target: ${(shortfall / 12).toFixed(0)} for 12 months
                </li>
                <li>• Consider high-yield savings account</li>
              </ul>
            </div>
          )}
        </div>

        {/* <div className="relative bg-accent/10 p-6 rounded-2xl w-full h-[200px] overflow-hidden">
          <div className="absolute inset-0 bg-accent/80 backdrop-blur-md flex flex-col items-center justify-center z-10 rounded-2xl">
            <h3 className="text-xl font-semibold text-primary mb-4 text-center">
              Upgrade to unlock personalized insights
            </h3>
            <Button className="text-base px-6 py-3">Upgrade Now</Button>
          </div>
        </div> */}
        {/* Optionally, add any blurred content here */}
      </CardContent>
    </Card>
  );
}

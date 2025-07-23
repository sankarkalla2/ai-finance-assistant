import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SpendingAnalysisProps {
  expenses: {
    housing: number;
    transportation: number;
    subscriptions: number;
    education: number;
    miscellaneous: number;
    totalExpenses: number;
    totalMonthlyIncome: number;
  };
}
export function SpendingAnalysis({ expenses }: SpendingAnalysisProps) {
  const description = "A pie chart with a label list";
  const chartData = [
    {
      Expense: "Housing",
      amount: expenses.housing,
      fill: "var(--color-Housing)",
    },
    {
      Expense: "Transportation",
      amount: expenses.transportation,
      fill: "var(--color-Transportation)",
    },
    {
      Expense: "Subscriptions",
      amount: expenses.subscriptions,
      fill: "var(--color-Subscriptions)",
    },
    { Expense: "Education", amount: 173, fill: "var(--color-Education)" },
    {
      Expense: "Miscellaneous",
      amount: expenses.miscellaneous,
      fill: "var(--color-Miscellaneous)",
    },
  ];
  const chartConfig = {
    amount: {
      label: "Amount",
    },
    Housing: {
      label: "Housing",
      color: "var(--chart-1)",
    },
    Transportation: {
      label: "Transportation",
      color: "var(--chart-2)",
    },
    Subscriptions: {
      label: "Subscriptions",
      color: "var(--chart-3)",
    },
    Education: {
      label: "Education",
      color: "var(--chart-4)",
    },
    Miscellaneous: {
      label: "Miscellaneous",
      color: "var(--chart-6)",
    },
  } satisfies ChartConfig;
  // Mock data based on UserInfo expense fields

  const totalExpenses = chartData.reduce((sum, entry) => sum + entry.amount, 0);
  return (
    <div className="grid gap-6 w-full">
      <Card className="w-full max-w-md md:*:max-w-xl lg:max-w-2xl">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>
            Monthly spending by category (${totalExpenses.toLocaleString()}{" "}
            total)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            key={chartData[0].Expense}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px] w-full"
          >
            <PieChart width={500} height={250}>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="amount" hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                labelLine={false}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      key={payload.name}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="hsla(var(--foreground))"
                    >
                      {payload.amount}{" "}
                    </text>
                  );
                }}
              ></Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="Expense" />}
                className="-translate-y-2 flex-wrap gap-2 gap-x-4 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

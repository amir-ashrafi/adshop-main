'use client'

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "سفارش‌ها",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type ChartDataItem = {
  month: string
  desktop: number
}

export default function ChartComponent({ chartData }: { chartData: ChartDataItem[] }) {
  const totalOrders = chartData.reduce((sum, item) => sum + item.desktop, 0)
  const averageOrders = totalOrders / chartData.length
  const currentMonthOrders = chartData[chartData.length - 1]?.desktop || 0
  const previousMonthOrders = chartData[chartData.length - 2]?.desktop || 0

  let trendPercentage = 0
  if (previousMonthOrders > 0) {
    trendPercentage = ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100
  }

  return (
    <Card dir="rtl" className="bg-gradient-to-br from-blue-50 to-indigo-100 border-none shadow-md">
      <CardHeader className="text-right">
        <CardTitle>آمار سفارش‌های ماهانه</CardTitle>
        <CardDescription>آخرین آمار ۶ ماه گذشته</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#3b82f6" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => value.toLocaleString("fa-IR")}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-end gap-2 text-sm text-right">
        <div className="flex gap-2 font-medium leading-none items-center">
          {trendPercentage > 0 ? 'روند صعودی' : 'روند نزولی'} به میزان
          <span className="font-bold px-1">
            {Math.abs(trendPercentage).toLocaleString("fa-IR")}٪
          </span>
          در این ماه
          <TrendingUp className={`h-4 w-4 ${trendPercentage < 0 ? 'rotate-180' : ''}`} />
        </div>
        <div className="leading-none text-muted-foreground">
          میانگین {averageOrders.toLocaleString("fa-IR")} سفارش در ماه
        </div>
      </CardFooter>
    </Card>
  )
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type Customer = {
  name: string;
  email: string;
  avatarUrl?: string;
  orderId?: string;
  total?: number;
  date?: string;
  status?: string;
};

export default function RecentCustomersCard({
  recentCustomers,
}: {
  recentCustomers: Customer[];
}) {
  const translateStatus = (status: string) => {
    switch (status) {
      case "PAID":
        return "پرداخت‌شده";
      case "PENDING":
        return "در انتظار";
      case "CANCELLED":
        return "لغو شده";
      default:
        return "نامشخص";
    }
  };

  return (
    <Card
      dir="rtl"
      className="max-w-full bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-none shadow-md"
    >
      <CardHeader className="text-right">
        <CardTitle>مشتریان اخیر</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {recentCustomers.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            مشتری جدیدی پیدا نشد
          </div>
        ) : (
          recentCustomers.map((customer, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0"
            >
              <div className="flex items-center gap-4">
                <Avatar className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14">
                  {customer.avatarUrl ? (
                    <AvatarImage
                      src={customer.avatarUrl}
                      alt={`${customer.name} avatar`}
                    />
                  ) : (
                    <AvatarFallback className="text-lg sm:text-xl">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="text-right">
                  <p className="text-sm sm:text-base font-medium leading-none">
                    {customer.name}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words max-w-xs">
                    {customer.email}
                  </p>
                  {typeof customer.total === "number" && (
                    <p className="mt-1 text-xs sm:text-sm text-green-600 font-medium">
                      {customer.total.toLocaleString("fa-IR")} تومان
                    </p>
                  )}
                </div>
              </div>

              {customer.status && (
                <Badge
                  variant={customer.status === "PAID" ? "default" : "secondary"}
                  className="text-xs sm:text-sm bg-green-500 whitespace-nowrap self-start sm:self-center"
                >
                  {translateStatus(customer.status)}
                </Badge>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

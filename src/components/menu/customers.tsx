import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export type Customer = {
  name: string
  email: string
  avatarUrl?: string
  orderId?: string
  total?: number
  date?: string
  status?: string
}

export default function RecentCustomersCard({ recentCustomers }: { recentCustomers: Customer[] }) {
  // تابع ترجمه وضعیت سفارش
  const translateStatus = (status: string) => {
    switch (status) {
      case "PAID":
        return "پرداخت‌شده"
      case "PENDING":
        return "در انتظار"
      case "CANCELLED":
        return "لغو شده"
      default:
        return "نامشخص"
    }
  }

  return (
    <Card dir="rtl">
      <CardHeader className="text-right">
        <CardTitle>مشتریان اخیر</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentCustomers.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            مشتری جدیدی پیدا نشد
          </div>
        ) : (
          recentCustomers.map((customer, idx) => (
            <div key={idx} className="flex items-center justify-between gap-0 ">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={customer.avatarUrl} />
                  <AvatarFallback>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium leading-none">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                  {customer.total && (
                    <p className="text-xs text-green-600 font-medium">
                      ${customer.total.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              {customer.status && (
                <Badge 
                  variant={customer.status === 'PAID' ? 'default' : 'secondary'}
                  className="text-xs bg-green-500 "
                >
                  {translateStatus(customer.status)}
                </Badge>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

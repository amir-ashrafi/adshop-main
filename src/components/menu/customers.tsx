import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Customer = {
  name: string
  email: string
  avatarUrl?: string
}


export default function RecentCustomersCard({recentCustomers}:{recentCustomers:Customer[]}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Last customers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentCustomers.map((customer, idx) => (
          <div key={idx} className="flex items-center space-x-4">
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
            <div>
              <p className="text-sm font-medium leading-none">{customer.name}</p>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

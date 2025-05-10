import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export type Order = {
  id: string
  customer: string
  amount: number
  status: "pending" | "shipped" | "cancelled"
  date: string
}


function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-200 text-yellow-800"
    case "shipped":
      return "bg-green-200 text-green-800"
    case "cancelled":
      return "bg-red-200 text-red-800"
    default:
      return "bg-gray-200 text-gray-800"
  }
}

export default function OrdersTable({orders}:{orders:Order[]}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>شماره سفارش</TableHead>
            <TableHead>مشتری</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="text-right">مبلغ</TableHead>
            <TableHead>عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                ${order.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      عملیات
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>مشاهده</DropdownMenuItem>
                    <DropdownMenuItem>تغییر وضعیت</DropdownMenuItem>
                    <DropdownMenuItem>حذف</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

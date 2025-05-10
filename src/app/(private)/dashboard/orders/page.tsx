import React from 'react'
import OrdersTable from '@/components/orders/orders'
import { Order } from '@/components/orders/orders'
const OrdersPage = () => {
    const orders: Order[] = [
        {
          id: "ORD-001",
          customer: "Ali Rezaei",
          amount: 250,
          status: "pending",
          date: "2025-05-06",
        },
        {
          id: "ORD-002",
          customer: "Sara Ahmadi",
          amount: 560,
          status: "shipped",
          date: "2025-05-05",
        },
      ]
  return (
    <div>
        <OrdersTable orders={orders}/>
    </div>
  )
}

export default OrdersPage
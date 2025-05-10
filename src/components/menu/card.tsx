import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"

type CartMenuProps = {
  value: string
  number: number
  icon: React.ReactNode
}

function CartMenu({ value, number, icon }: CartMenuProps) {
  return (
    <Card className="w-full shadow-sm ">
      <CardHeader>
        <div className="flex justify-center items-center space-x-3">
          <div className="text-muted-foreground">{icon}</div>
          <span className="text-sm font-medium">{value}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-center">{number}</p>
      </CardContent>
    </Card>
  )
}

export default CartMenu

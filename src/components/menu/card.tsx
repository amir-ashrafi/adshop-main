import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"

type CartMenuProps = {
  value: string
  number: number
  icon: React.ReactNode
  bgColor?: string
}

function CartMenu({ value, number, icon,bgColor = "bg-white"  }: CartMenuProps) {
  return (
    <Card className={`w-full shadow-sm   ${bgColor}`}>
      <CardHeader>
        <div className="flex justify-center items-center space-x-3">
          <span className="text-sm font-medium">{value}</span>
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-center">{number.toLocaleString("fa-IR")}</p>
      </CardContent>
    </Card>
  )
}

export default CartMenu

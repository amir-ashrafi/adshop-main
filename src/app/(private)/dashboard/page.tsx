import CartMenu from "@/components/menu/card"
import { UsersIcon, ShoppingCartIcon, DollarSignIcon, PackageIcon } from "lucide-react"
import ChartComponent from '@/components/menu/chart'
import RecentCustomersCard from "@/components/menu/customers"
import {Customer} from '@/components/menu/customers'
function Page() {
  const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]


const recentCustomers: Customer[] = [
  { name: "Ali Rezaei", email: "ali@example.com" },
  { name: "Sara Ahmadi", email: "sara@example.com" },
  { name: "Hossein Zarei", email: "hossein@example.com" },
  { name: "Niloofar M.", email: "niloofar@example.com" },
  { name: "Reza Kh.", email: "reza@example.com" },
]

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
        <CartMenu value="Users" number={1200} icon={<UsersIcon className="h-5 w-5 text-muted-foreground" />} />
        <CartMenu value="Orders" number={32} icon={<ShoppingCartIcon className="h-5 w-5 text-muted-foreground" />} />
        <CartMenu value="Income" number={500000} icon={<DollarSignIcon className="h-5 w-5 text-muted-foreground" />} />
        <CartMenu value="Products" number={87} icon={<PackageIcon className="h-5 w-5 text-muted-foreground" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartComponent chartData={chartData}/>
        <RecentCustomersCard recentCustomers={recentCustomers}/>
      </div>
    </div>
  )
}

export default Page
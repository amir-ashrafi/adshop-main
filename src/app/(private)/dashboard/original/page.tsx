import { UsersIcon, ShoppingCartIcon, DollarSignIcon, PackageIcon } from 'lucide-react';
import { headers } from 'next/headers';

import CartMenu from '@/components/menu/card';
import ChartComponent from '@/components/menu/chart';
import RecentCustomersCard, { Customer } from '@/components/menu/customers';

interface DashboardStats {
  users: number;
  orders: number;
  income: number;
  products: number;
}

interface ChartDataItem {
  month: string;
  desktop: number;
}

interface CustomerData {
  name: string;
  email: string;
  orderId: string;
  total: number;
  date: string;
  status: string;
}

async function getDashboardData() {
    const headersList = await headers(); 
  const cookieHeader = headersList.get('cookie') ?? '';

  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
  }

  const fetchOptions = {
    headers: {
      cookie: cookieHeader,
    },
    cache: 'no-store' as const,
  };

  const [statsRes, chartRes, customersRes] = await Promise.all([
    fetch(`${baseUrl}/api/dashboard/stats`, fetchOptions),
    fetch(`${baseUrl}/api/dashboard/chart`, fetchOptions),
    fetch(`${baseUrl}/api/dashboard/customers`, fetchOptions),
  ]);

  if (!statsRes.ok) throw new Error('Failed to fetch stats');
  if (!chartRes.ok) throw new Error('Failed to fetch chart data');
  if (!customersRes.ok) throw new Error('Failed to fetch customers');

  const stats: DashboardStats = await statsRes.json();
  const chartData: ChartDataItem[] = await chartRes.json();
  const customersData: CustomerData[] = await customersRes.json();

  const recentCustomers: Customer[] = customersData.map((customer) => ({
    name: customer.name,
    email: customer.email,
    orderId: customer.orderId,
    total: customer.total,
    date: customer.date,
    status: customer.status,
    avatarUrl: undefined,
  }));

  return { stats, chartData, recentCustomers };
}

export default async function Page() {
  const { stats, chartData, recentCustomers } = await getDashboardData();

  return (
    <div className="space-y-10 flex flex-col">
      {/* عنوان داشبورد */}
      <div className="text-right flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">داشبورد مدیریت</h1>
        <p className="text-muted-foreground mt-1 text-sm">نمای کلی از آمار فروشگاه</p>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <CartMenu
    value="کاربران"
    number={stats.users}
    icon={<UsersIcon className="h-6 w-6 text-primary" />}
    bgColor="bg-yellow-50"
  />
  <CartMenu
    value="سفارش‌ها"
    number={stats.orders}
    icon={<ShoppingCartIcon className="h-6 w-6 text-primary" />}
    bgColor="bg-green-50"
  />
  <CartMenu
    value="درآمد"
    number={stats.income}
    icon={<DollarSignIcon className="h-6 w-6 text-primary" />}
    bgColor="bg-blue-50"
  />
  <CartMenu
    value="محصولات"
    number={stats.products}
    icon={<PackageIcon className="h-6 w-6 text-primary" />}
    bgColor="bg-purple-50"
  />
</div>


      {/* نمودار و مشتریان اخیر */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartComponent chartData={chartData} />
        <RecentCustomersCard recentCustomers={recentCustomers} />
      </div>
    </div>
  );
}

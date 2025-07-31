'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
interface ApiOrder {
  id: string;
  userId: string;
  orderNumber: number;
  customer: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      price: number | null;
      image: string | null;
    };
  }>;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/dashboard/orders');
        if (response.ok) {
          const apiOrders: ApiOrder[] = await response.json();
          setOrders(apiOrders);
        }
      } catch {}
      finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/dashboard/orders`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
        toast.success('وضعیت سفارش با موفقیت تغییر کرد');
      } else {
        toast.error('خطا در تغییر وضعیت سفارش');
      }
    } catch {
      toast.error('خطا در تغییر وضعیت سفارش');
    }
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="overflow-x-auto ">
      <h1 className='w-full flex font-bold justify-center pb-6 text-2xl'>مدیریت سفارشات</h1>
      <table className="min-w-full border border-gray-300 text-sm text-right">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-2 py-1">شماره سفارش</th>
            <th className="border border-gray-300 px-2 py-1">نام مشتری</th>
            <th className="border border-gray-300 px-2 py-1">ایمیل</th>
            <th className="border border-gray-300 px-2 py-1">محصولات</th>
            <th className="border border-gray-300 px-2 py-1">مبلغ کل</th>
            <th className="border border-gray-300 px-2 py-1">وضعیت</th>
            <th className="border border-gray-300 px-2 py-1">تاریخ</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(ordersPerPage)].map((_, i) => (
              <tr key={i}>
                <td className="border px-2 py-1"><Skeleton className="h-4 w-16" /></td>
                <td className="border px-2 py-1"><Skeleton className="h-4 w-24" /></td>
                <td className="border px-2 py-1"><Skeleton className="h-4 w-32" /></td>
                <td className="border px-2 py-1">
                  <Skeleton className="h-4 w-full max-w-xs" />
                  <Skeleton className="h-4 w-full max-w-xs mt-1" />
                </td>
                <td className="border px-2 py-1"><Skeleton className="h-4 w-20" /></td>
                <td className="border px-2 py-1"><Skeleton className="h-4 w-24" /></td>
                <td className="border px-2 py-1"><Skeleton className="h-4 w-24" /></td>
              </tr>
            ))
          ) : (paginatedOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{order.orderNumber}</td>
              <td className="px-4 py-2 border">{order.customer}</td>
              <td className="px-4 py-2 border">{order.customerEmail}</td>
              <td className="px-4 py-2 border">
                  <ul className="list-disc pr-4 space-y-1 text-xs">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.product.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 border">{order.total.toLocaleString()} تومان</td>
              <td className="px-4 py-2 border">
              {order.status === 'PAID' && (
              <button
                className="text-green-600 hover:text-green-800 underline"
                onClick={() => {
                  if (window.confirm('آیا سفارش ارسال شود؟')) {
                    handleStatusChange(order.id, 'SHIPPED');
                  }
                }}
              >
                پرداخت شده (ارسال شود؟)
              </button>
            )}
            {order.status === 'SHIPPED' && (
              <button
                className="text-blue-600 hover:text-blue-800 underline"
                onClick={() => {
                  if (window.confirm('آیا سفارش تحویل داده شد؟')) {
                    handleStatusChange(order.id, 'DELIVERED');
                  }
                }}
              >
                ارسال شده (تحویل داده شد؟)
              </button>
            )}
            {order.status === 'DELIVERED' && (
              <span className="text-green-800 font-semibold">تحویل شده</span>
            )}
              </td>
              <td className="px-4 py-2 border">
            {new Date(order.createdAt).toLocaleDateString('fa-IR')}
          </td>
          </tr>
          )))}
        </tbody>
      </table>
      <div className="flex flex-wrap justify-center items-center gap-2 p-4">
    <button
      className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
      disabled={currentPage === 1}
    >
      قبلی
    </button>

    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        className={`px-3 py-1 border rounded ${
          currentPage === i + 1
            ? 'bg-blue-600 text-white'
            : 'bg-white hover:bg-gray-100'
        }`}
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </button>
    ))}

    <button
      className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      disabled={currentPage === totalPages}
    >
      بعدی
    </button>
  </div>
</div>
  );
};

export default OrdersPage;

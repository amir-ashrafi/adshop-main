'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
        const res = await fetch('/api/dashboard/orders');
        if (res.ok) {
          const apiOrders: ApiOrder[] = await res.json();
          setOrders(apiOrders);
        }
      } catch (error) {
        toast.error('خطا در دریافت سفارشات');
      } finally {
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
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        toast.success('وضعیت سفارش با موفقیت تغییر کرد');
      } else {
        toast.error('خطا در تغییر وضعیت سفارش');
      }
    } catch {
      toast.error('خطا در تغییر وضعیت سفارش');
    }
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="mb-6 text-2xl font-bold text-center">مدیریت سفارشات</h1>

      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-right">شماره سفارش</TableHead>
            <TableHead className="text-right">نام مشتری</TableHead>
            <TableHead className="text-right">ایمیل</TableHead>
            <TableHead className="text-right">محصولات</TableHead>
            <TableHead className="text-right">مبلغ کل</TableHead>
            <TableHead className="text-right">وضعیت</TableHead>
            <TableHead className="text-right">تاریخ</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? [...Array(ordersPerPage)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full max-w-xs" />
                    <Skeleton className="h-4 w-full max-w-xs mt-1" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                </TableRow>
              ))
            : paginatedOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="text-right">{order.orderNumber.toLocaleString('fa-IR')}</TableCell>
                  <TableCell className="text-right">{order.customer}</TableCell>
                  <TableCell className="text-right">{order.customerEmail}</TableCell>
                  <TableCell className="text-right">
                    <ul className="list-disc pr-4 space-y-1 text-xs">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.product.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="text-right">
                    {order.total.toLocaleString('fa-IR')} تومان
                  </TableCell>
                  <TableCell className="text-right">
                    {order.status === 'PAID' && (
                      <Button
                        variant="link"
                        className="text-green-600 hover:text-green-800 underline p-0 h-auto"
                        onClick={() => {
                          if (window.confirm('آیا سفارش ارسال شود؟')) {
                            handleStatusChange(order.id, 'SHIPPED');
                          }
                        }}
                      >
                        پرداخت شده (ارسال شود؟)
                      </Button>
                    )}
                    {order.status === 'SHIPPED' && (
                      <Button
                        variant="link"
                        className="text-blue-600 hover:text-blue-800 underline p-0 h-auto"
                        onClick={() => {
                          if (window.confirm('آیا سفارش تحویل داده شد؟')) {
                            handleStatusChange(order.id, 'DELIVERED');
                          }
                        }}
                      >
                        ارسال شده (تحویل داده شد؟)
                      </Button>
                    )}
                    {order.status === 'DELIVERED' && (
                      <span className="text-green-800 font-semibold">تحویل شده</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <div className="flex flex-wrap justify-center items-center gap-2 p-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          قبلی
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? 'default' : 'outline'}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
};

export default OrdersPage;

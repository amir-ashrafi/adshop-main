'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
} from '@/components/ui';
import { useCart } from '@/hooks/useCart';
import { CartWithProduct } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { getDiscountedPrice } from '@/lib/utils';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function CartDropdown() {
  const { cart, isLoading, removeCartItemMutation } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const queryClient = useQueryClient();

  const handleCheckout = async () => {
    setIsPaying(true);
    try {
      const res = await fetch('/api/orders', { method: 'POST' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'خطا در ثبت سفارش');
      }
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('سفارش با موفقیت ثبت شد!');
    } catch (e: any) {
      toast.error(e?.message || 'مشکلی در ثبت سفارش رخ داد.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative border-2 border-white border-b-slate-500 rounded-md hover:border-white duration-500 px-4 py-2 hover:bg-black hover:text-white h-12">
          <ShoppingCart size={24} />
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length.toLocaleString("fa-IR")}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4">
        <h4 className="text-lg font-semibold mb-2">سبد خرید</h4>
        {isLoading ? (
          <p>در حال بارگذاری...</p>
        ) : !cart || cart.length === 0 ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
          <div className="space-y-3">
            {cart.map((item: CartWithProduct) => {
              const finalPrice = getDiscountedPrice(
                item.product.price || null,
                item.product.discount || null,
                item.product.discountEndsAt || null
              );

              // فرض می‌کنیم قیمت‌ها به هزار تومان است
              const priceInToman = finalPrice * 1000;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      تعداد: {item.quantity.toLocaleString("fa-IR")}
                    </p>
                    <p className="text-xs text-gray-500">
                      قیمت: {priceInToman.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCartItemMutation.mutate(item.product.id)}
                  >
                    ×
                  </Button>
                </div>
              );
            })}
            <Button
              className="w-full mt-2"
              onClick={handleCheckout}
              disabled={isPaying}
              variant="default"
            >
              {isPaying ? 'در حال پرداخت...' : 'پرداخت (آزمایشی)'}
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

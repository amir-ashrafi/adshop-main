'use client';

import { Product, ProductCategory } from '@prisma/client';
import {
  Input,
  Button,
  Textarea,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui';
import Link from 'next/link';
import UploadImage from './UploadImage';
import { useActionState, useEffect, useState } from 'react';
import { upsertProduct } from '../actions';
import { toast } from 'sonner';

const persianToEnglishDigits = (str: string) => {
  return str.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
};

const onlyNumbers = (str: string) => {
  return str.replace(/[^\d]/g, '');
};

const formatNumberToFarsi = (num: number | string) => {
  if (typeof num === 'string') {
    num = Number(num);
  }
  if (isNaN(num)) return '';
  return num.toLocaleString('fa-IR');
};

const ProductForm = (props: { product: Product | null }) => {
  const { product } = props;
  const [state, action, isPending] = useActionState<
    {
      data: Product | null;
      error: Record<string, string> | null;
    },
    FormData
  >(upsertProduct, {
    data: product ?? null,
    error: null,
  });

  const { error, data } = state;

  const [submitted, setSubmitted] = useState(false);

  // مدیریت state داخلی برای سه فیلد عددی:
  const [price, setPrice] = useState<number>(data?.price ?? 0);
  const [quantity, setQuantity] = useState<number>(data?.quantity ?? 0);
  const [discount, setDiscount] = useState<number>(data?.discount ?? 0);

  const handleSubmit = async (formData: FormData) => {
    // چون مقادیر فارسی هستن، اول اونا رو انگلیسی می‌کنیم
    formData.set('price', price.toString());
    formData.set('quantity', quantity.toString());
    formData.set('discount', discount.toString());

    const discountVal = discount;
    const discountEndsAt = formData.get('discountEndsAt') as string;

    if (discountVal > 0 && !discountEndsAt) {
      toast.error('لطفاً تاریخ پایان تخفیف را مشخص کنید.');
      return;
    }

    setSubmitted(true);
    action(formData);
  };

  useEffect(() => {
    if (!submitted) return;
    if (error) toast.error('خطا در ذخیره‌سازی');
    else if (data) toast.success('ذخیره‌سازی موفق');
  }, [submitted, error, data]);

  return (
    <main className="flex py-6 justify-center bg-white/5">
      <Card className="w-full max-w-2xl shadow-2xl border-none bg-gradient-to-br shadow-background from-black to-blue-800 text-white">
        <form className="w-full" action={handleSubmit}>
          <input type="hidden" name="id" value={product?.id || ''} />

          <CardHeader>
            <CardTitle className="text-2xl w-full flex justify-center">
              {product?.id ? 'ویرایش محصول' : 'افزودن محصول جدید'}
            </CardTitle>
            <CardDescription className="text-white/80 w-full flex justify-center">
              اطلاعات محصول را وارد کنید
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="space-y-3">
              <Label htmlFor="name" className="w-full flex justify-end">
                نام محصول
              </Label>
              <Input
                className="focus:bg-white bg-white/90 text-black text-right justify-end"
                name="name"
                id="name"
                defaultValue={data?.name || ''}
              />
              {error?.name && (
                <p className="text-red-200 text-sm mt-1">{error.name}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="w-full flex justify-end">
                دسته‌بندی
              </Label>
              <Select name="category" defaultValue={data?.category || ProductCategory.OTHERS}>
                <SelectTrigger className="focus:bg-white justify-end bg-white/90 text-black">
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ProductCategory).map((cat) => (
                    <SelectItem className="flex justify-end" key={cat} value={cat}>
                      {cat === 'AIRPODS'
                        ? 'ایرپاد'
                        : cat === 'COMPUTER'
                        ? 'کامپیوتر'
                        : cat === 'LAPTOP'
                        ? 'لپتاب'
                        : cat === 'MOBILE'
                        ? 'موبایل'
                        : cat === 'MONITOR'
                        ? 'مانیتور'
                        : cat === 'OTHERS'
                        ? 'دیگر'
                        : cat === 'WATCH'
                        ? 'ساعت هوشمند'
                        : 'نامعلوم'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="w-full flex justify-end">
                توضیحات
              </Label>
              <Textarea
                name="description"
                id="description"
                defaultValue={data?.description || ''}
                className="focus:bg-white bg-white/90 text-black w-full text-right flex justify-end"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="w-full flex justify-end" htmlFor="price">
                  قیمت
                </Label>
                <Input
                  name="price"
                  type="text"
                  id="price"
                  className="focus:bg-white bg-white/90 text-black"
                  value={formatNumberToFarsi(price)}
                  onChange={(e) => {
                    const english = onlyNumbers(persianToEnglishDigits(e.target.value));
                    setPrice(Number(english) || 0);
                  }}
                />
                {error?.price && (
                  <p className="text-red-200 text-sm mt-1">{error.price}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="w-full flex justify-end" htmlFor="quantity">
                  تعداد موجود
                </Label>
                <Input
                  name="quantity"
                  type="text"
                  id="quantity"
                  className="focus:bg-white bg-white/90 text-black"
                  value={formatNumberToFarsi(quantity)}
                  onChange={(e) => {
                    const english = onlyNumbers(persianToEnglishDigits(e.target.value));
                    setQuantity(Number(english) || 0);
                  }}
                />
                {error?.quantity && (
                  <p className="text-red-200 text-sm mt-1">{error.quantity}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="w-full flex justify-end" htmlFor="discount">
                  تخفیف (%)
                </Label>
                <Input
                  name="discount"
                  type="text"
                  id="discount"
                  className="focus:bg-white bg-white/90 text-black"
                  value={formatNumberToFarsi(discount)}
                  onChange={(e) => {
                    const english = onlyNumbers(persianToEnglishDigits(e.target.value));
                    setDiscount(Number(english) || 0);
                  }}
                />
                {error?.discount && (
                  <p className="text-red-200 text-sm mt-1">{error.discount}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="w-full flex justify-end" htmlFor="discountEndsAt">
                  پایان تخفیف
                </Label>
                <Input
                  type="datetime-local"
                  id="discountEndsAt"
                  name="discountEndsAt"
                  className="focus:bg-white bg-white/90 text-black"
                  defaultValue={
                    product?.discountEndsAt
                      ? new Date(
                          new Date(product.discountEndsAt).getTime() -
                            new Date().getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ''
                  }
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-around">
            <Button variant="outline" asChild className="bg-white py-5 text-black">
              <Link href="/dashboard/products">بازگشت</Link>
            </Button>
            <Button
              variant="outline"
              className="py-5 text-black border-2 border-white border-b-slate-500 hover:border-white duration-500 hover:bg-black hover:text-white w-28 sm:w-auto"
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? 'در حال ذخیره...'
                : product?.id
                ? 'ذخیره تغییرات'
                : 'افزودن محصول'}
            </Button>
          </CardFooter>

          {product?.id && (
            <CardFooter>
              <UploadImage productId={product.id} />
            </CardFooter>
          )}
        </form>
      </Card>
    </main>
  );
};

export default ProductForm;

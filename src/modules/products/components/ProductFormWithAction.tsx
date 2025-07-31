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

// toast('Event has been created.');

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

const handleSubmit = async (formData: FormData) => {
  const discount = parseFloat(formData.get('discount') as string) || 0;
  const discountEndsAt = formData.get('discountEndsAt') as string;

  if (discount > 0 && !discountEndsAt) {
    toast.error('لطفاً تاریخ پایان تخفیف را مشخص کنید.');
    return;
  }

  setSubmitted(true);
  action(formData);
};


useEffect(() => {
  if (!submitted) return;
  if (error) toast.error('Failed');
  else if (data) toast.success('success');
}, [submitted, error, data]);


  return (
    <main className=" flex py-6 justify-center bg-white bg-muted ">
  <Card className="w-full max-w-2xl shadow-2xl border-none bg-gradient-to-br shadow-background from-blue-500 via-indigo-600 to-purple-600 text-white">
    <form className="w-full" action={handleSubmit}>
      <input type="hidden" name="id" value={product?.id || ''} />
      
      <CardHeader>
        <CardTitle className="text-2xl w-full flex justify-center">
          {product?.id ? 'ویرایش محصول' : 'افزودن محصول جدید'}
        </CardTitle>
        <CardDescription className="text-white/80 w-full flex justify-center">اطلاعات محصول را وارد کنید</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className='space-y-3'>
          <Label htmlFor="name" className='w-full flex justify-center'>نام محصول</Label>
          <Input className='focus:bg-white bg-white/90 text-black' name="name" id="name" defaultValue={data?.name || ''} />
          {error?.name && <p className="text-red-200  text-sm mt-1">{error.name}</p>}
        </div>

        <div className='space-y-3'>
          <Label htmlFor="category" className='w-full flex justify-center'>دسته‌بندی</Label>
          <Select
            name="category"
            defaultValue={data?.category || ProductCategory.OTHERS}
            
          >
            <SelectTrigger className="focus:bg-white bg-white/90 text-black">
              <SelectValue placeholder="انتخاب دسته‌بندی" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ProductCategory).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-3'>
          <Label htmlFor="description" className='w-full flex justify-center'>توضیحات</Label>
          <Textarea
            name="description"
            id="description"
            defaultValue={data?.description || ''}
            className="focus:bg-white bg-white/90 text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='space-y-3'>
            <Label className='w-full flex justify-center' htmlFor="price">قیمت</Label>
            <Input
              name="price"
              type="number"
              id="price"
              step="0.01"
              defaultValue={data?.price || ''}
              className='focus:bg-white bg-white/90 text-black'
            />
            {error?.price && (
              <p className="text-red-200 text-sm mt-1">{error.price}</p>
            )}
          </div>

          <div className='space-y-3'>
            <Label className='w-full flex justify-center' htmlFor="quantity">تعداد موجود</Label>
            <Input
              name="quantity"
              type="number"
              id="quantity"
              defaultValue={data?.quantity || ''}
              className='focus:bg-white bg-white/90 text-black'
            />
            {error?.quantity && (
              <p className="text-red-200 text-sm mt-1">{error.quantity}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='space-y-3'>
            <Label className='w-full flex justify-center' htmlFor="discount">تخفیف (%)</Label>
            <Input
              name="discount"
              type="number"
              id="discount"
              step="0.1"
              min="0"
              max="100"
              className="focus:bg-white bg-white/90 text-black"
              defaultValue={data?.discount?.toString() || '0'}
            />
            {error?.discount && (
              <p className="text-red-200 text-sm mt-1">{error.discount}</p>
            )}
          </div>

          <div className='space-y-3'>
            <Label className='w-full flex justify-center' htmlFor="discountEndsAt">پایان تخفیف</Label>
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

      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild className="bg-white text-black">
          <Link href="/dashboard/products">بازگشت</Link>
        </Button>
        <Button  type="submit" disabled={isPending}>
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

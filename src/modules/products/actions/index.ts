'use server';

import { prisma } from '@/lib/prisma';
import { Product, ProductCategory } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// اعتبارسنجی
const validationUpsertProduct = (data: Record<string, any>) => {
  const formSchema = z.object({
    name: z.string().min(1, { message: 'name is required' }),
    description: z.string(),
    price: z
      .number({ message: 'price is required' })
      .min(1, { message: 'price must be at least 1' }),
    quantity: z
      .number({ message: 'quantity is required' })
      .min(1, { message: 'quantity must be at least 1' })
      .max(1000, { message: 'quantity must be at most 1000' }),
    category: z.enum(Object.values(ProductCategory) as [string]),
    discount: z.number().min(0).max(100).optional(),
    discountEndsAt: z
      .string()
      .optional()
      .refine(val => {
        if (!val) return true;
        const withSeconds = val.includes(':') ? `${val}:00` : val;
        return !isNaN(Date.parse(withSeconds));
      }, {
        message: 'discountEndsAt must be a valid datetime string',
      }),
  });

  const result = formSchema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return errors;
  }
  return null;
};

// تابع اصلی
export const upsertProduct = async (
  prevData: { data: Product | null; error: Record<string, string> | null },
  formData: FormData,
) => {
  const id = formData.get('id') as string | null;
  const discountEndsAtRaw = formData.get('discountEndsAt') as string | null;

  // داده‌های خام برای اعتبارسنجی
  const rawProductData = {
    name: formData.get('name'),
    category: formData.get('category'),
    description: formData.get('description'),
    price: Number(formData.get('price')),
    quantity: Number(formData.get('quantity')),
    discount: Number(formData.get('discount') || 0),
    discountEndsAt: discountEndsAtRaw || undefined,
  };

  // اعتبارسنجی
  const error = validationUpsertProduct(rawProductData);
  if (error) {
    return { data: prevData.data, error };
  }

  // تبدیل discountEndsAt به Date
  let discountEndsAt: Date | null = null;
  if (discountEndsAtRaw) {
    const [date, time] = discountEndsAtRaw.split('T');
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    discountEndsAt = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  }

  const productData = {
    name: rawProductData.name as string,
    category: rawProductData.category as ProductCategory,
    description: rawProductData.description as string,
    price: Number(rawProductData.price),
    quantity: Number(rawProductData.quantity),
    discount: Number(rawProductData.discount),
    discountEndsAt,
  };

  try {
    let result;
    if (id) {
      result = await prisma.product.update({
        where: { id },
        data: productData,
      });
    } else {
      result = await prisma.product.create({
        data: productData,
      });
    }

    revalidatePath('/dashboard/products');
    return { error: null, data: result };
  } catch (e) {
    // eslint-disable-next-line no-console
      console.error('Upsert Error:', e);
    return { data: prevData.data, error: { general: 'upsert failed' } };
  }
};

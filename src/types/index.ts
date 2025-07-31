import { Prisma } from '@prisma/client';

export type ProductsWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

export type CartWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true; Images: true };
}>;
export type ProductType = {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  discountEndsAt?: Date | null;
  discount?: number | null;
  price?: number | null;
  quantity?: number | null;
  images: { id: string; image: string; productId: string | null }[];
};
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
  published: boolean;
}
 // types.ts یا '@/types/index.ts'
export interface ClerkUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: 'admin' | 'user';
  banned?: boolean;
}

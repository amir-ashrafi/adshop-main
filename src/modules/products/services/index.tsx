'use server';

import { prisma } from '@/lib/prisma';
import { Product, ProductCategory } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SortOption, CategoryFilter } from '../components/ProductFilters';

export const getProducts = async (
  discountOnly: boolean = false,
  sortBy: SortOption = 'bestselling',
  categoryFilter: CategoryFilter = 'all',
  searchQuery: string = ''
) => {
  // Build where clause
  const whereClause: any = {};
  
  if (discountOnly) {
    whereClause.AND = [
      { discount: { gt: 0 } },
      { discountEndsAt: { not: null } },
      { discountEndsAt: { gt: new Date() } }
    ];
  }
  
  if (categoryFilter !== 'all') {
    whereClause.category = categoryFilter as ProductCategory;
  }

  // Add search functionality
  if (searchQuery.trim()) {
    whereClause.OR = [
      {
        name: {
          contains: searchQuery,
          mode: 'insensitive', // Case insensitive search
        },
      },
      {
        description: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
    ];
  }

  // Build orderBy clause
  const orderBy: any = {};
  
  switch (sortBy) {
    case 'price-asc':
      orderBy.price = 'asc';
      break;
    case 'price-desc':
      orderBy.price = 'desc';
      break;
    case 'discount-desc':
      orderBy.discount = 'desc';
      break;
    case 'bestselling':
      orderBy.quantity = 'desc';
      break;
    case 'newest':
      orderBy.createdAt = 'desc';
      break;
    default:
      orderBy.quantity = 'desc';
  }


  const result = await prisma.product.findMany({
    where: whereClause,
    include: { images: true },
    orderBy: orderBy,
  });

  return result;
};
export const getProductsAPI = async () => {
  const result = await fetch('http://localhost:3000/api/product', {
    next: { revalidate: 30 },
  });
  const response = await result.json();
  return response;
};

export const getProductById = async (id: string) => {
  const result = await prisma.product.findFirst({
    where: { id },
    include: { images: true },
  });
  if (!result) {
    return null;
  }
  return result;
};

export const upsertProduct = async (product: Product) => {
  const { id } = product;
  let result;
  if (id) {
    result = await prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  } else {
    result = await prisma.product.create({
      data: product,
    });
  }

  revalidatePath('/dashboard/products');

  return result;
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  redirect('/dashboard/products');
};

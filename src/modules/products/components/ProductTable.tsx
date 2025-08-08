'use client';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteProduct } from '../services';
import { Product } from '@prisma/client';

const ProductTable = (props: {
  products: Product[];
}) => {
  const { products } = props;

  const onDeleteProduct = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-xl font-semibold">محصولات</h1>
        <Button
          asChild
          variant="outline"
          className="group flex justify-between items-center py-5 border-2 border-white border-b-slate-500 hover:border-white duration-500 hover:bg-black hover:text-white w-28 sm:w-auto"
        >
          <Link href="/dashboard/products/new">
            افزودن محصول
            <PlusCircle />
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام</TableHead>
            <TableHead className="text-center">دسته‌بندی</TableHead>
            <TableHead className="text-center">قیمت</TableHead>
            <TableHead className="text-center">موجودی</TableHead>
            <TableHead className="text-center">تصویر</TableHead>
            <TableHead className="text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-center">{product.category}</TableCell>
              <TableCell className="text-center">{product.price}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">
                <Image
                  src={product.images?.[0]?.image || '/assets/noImage.jpg'}
                  alt={product.name || 'محصول'}
                  width={50}
                  height={50}
                  className="rounded-full m-auto"
                />
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2 items-center">
                  <Button variant="ghost" asChild>
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Edit />
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>تعداد کل</TableCell>
            <TableCell className="text-right">{products.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductTable;

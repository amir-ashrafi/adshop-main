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
  Input
} from '@/components/ui';
import { Edit, PlusCircle, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteProduct } from '../services';
import { Product } from '@prisma/client';
import { useState } from 'react';

const ProductTable = (props: { products: Product[] }) => {
  const { products } = props;

  const [searchTerm, setSearchTerm] = useState('');

  const onDeleteProduct = (id: string) => {
    deleteProduct(id);
  };

  // فیلتر محصولات بر اساس جستجو
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border border-gray-200 rounded-lg shadow-md mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-gray-100">
        <h1 className="text-xl font-semibold">محصولات</h1>

        <div className="flex items-center justify-end gap-2 w-full sm:w-72 md:w-full">
          <Input
            type="text"
            placeholder="...جستجو"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-right focus:border-blue-500"
          />
          <Search className="text-blue-900" />
        </div>

        <Button
          asChild
          variant="outline"
          className="group flex justify-between items-center py-5 border-2 border-white border-b-slate-500 hover:border-white duration-500 hover:bg-black hover:text-white w-36 sm:w-auto"
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
          {filteredProducts.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-center">
                {product.category === 'AIRPODS'
                  ? 'ایرپاد'
                  : product.category === 'COMPUTER'
                  ? 'کامپیوتر'
                  : product.category === 'LAPTOP'
                  ? 'لپتاب'
                  : product.category === 'MOBILE'
                  ? 'موبایل'
                  : product.category === 'MONITOR'
                  ? 'مانیتور'
                  : product.category === 'OTHERS'
                  ? 'دیگر'
                  : product.category === 'WATCH'
                  ? 'ساعت هوشمند'
                  : 'نامعلوم'}
              </TableCell>
              <TableCell className="text-center">{product.price.toLocaleString('fa-IR')}</TableCell>
              <TableCell className="text-center">{product.quantity.toLocaleString('fa-IR')}</TableCell>
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
            <TableCell className="text-right">{filteredProducts.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductTable;

import React from 'react';
import ProductItem from './ProductItem';
import { ProductsWithImages } from '@/types';

function ProductList({ products }: { products: ProductsWithImages[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white w-full my-10 px-10 md:px-5">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  );
}


export default ProductList;

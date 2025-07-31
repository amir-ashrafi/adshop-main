'use client';

import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services';
import { ProductsWithImages } from '@/types';
import { useSearchParams } from 'next/navigation';
import { isDiscountValid, getEffectiveDiscount } from '@/lib/utils';

function ProductListView() {
  const [products, setProducts] = useState<ProductsWithImages[]>([]);
  const searchParams = useSearchParams();
  const isDiscountFilter = searchParams.get('discount') === 'true';

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      const filtered = isDiscountFilter
        ? result.filter((product) => {
            const effectiveDiscount = getEffectiveDiscount(
              product.discount || null,
              product.discountEndsAt || null
            );
            return (
              effectiveDiscount > 0 &&
              isDiscountValid(product.discountEndsAt || null)
            );
          })
        : result;
      setProducts(filtered);
    };

    fetchData();
  }, [isDiscountFilter]);

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default ProductListView;

'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductFilters, { SortOption, CategoryFilter } from './ProductFilters';
import ProductSummary from './ProductSummary';
import ProductSearch from './ProductSearch';

interface ProductFiltersWrapperProps {
  initialSortBy: SortOption;
  initialCategoryFilter: CategoryFilter;
  initialSearchQuery: string;
  productCount: number;
}

const ProductFiltersWrapper: React.FC<ProductFiltersWrapperProps> = ({
  initialSortBy,
  initialCategoryFilter,
  initialSearchQuery,
  productCount,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateURL = (newSortBy?: SortOption, newCategoryFilter?: CategoryFilter, newSearchQuery?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newSortBy) {
      params.set('sort', newSortBy);
    }
    
    if (newCategoryFilter) {
      params.set('category', newCategoryFilter);
    }
    
    if (newSearchQuery !== undefined) {
      if (newSearchQuery.trim()) {
        params.set('search', newSearchQuery.trim());
      } else {
        params.delete('search');
      }
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (sort: SortOption) => {
    updateURL(sort, undefined, undefined);
  };

  const handleCategoryChange = (category: CategoryFilter) => {
    updateURL(undefined, category, undefined);
  };

  const handleSearchChange = (query: string) => {
    updateURL(undefined, undefined, query);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('sort');
    params.delete('search');
    router.push(`/products?${params.toString()}`);
  };

  return (
<div className="space-y-4 p-5 rounded-xl bg-gray-100">
  {/* جستجو و خلاصه محصولات */}
  <div className="flex flex-col justify-around md:flex-row gap-4 lg:justify-center  w-full">
    <div className="w-full  md:w-1/2">
      <ProductSearch
        searchQuery={initialSearchQuery}
        onSearchChange={handleSearchChange}
      />
    </div>
    <div className="w-full md:w-auto">
      <ProductFilters
    sortBy={initialSortBy}
    categoryFilter={initialCategoryFilter}
    onSortChange={handleSortChange}
    onCategoryChange={handleCategoryChange}
  />
    </div>
  </div>
<ProductSummary
        productCount={productCount}
        categoryFilter={initialCategoryFilter}
        searchQuery={initialSearchQuery}
        onClearFilters={handleClearFilters}
      />
  {/* فیلترها */}
  
</div>
  );
};

export default ProductFiltersWrapper; 
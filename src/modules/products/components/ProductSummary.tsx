'use client';

import React from 'react';
import { CategoryFilter } from './ProductFilters';
import { X } from 'lucide-react';
import { Button } from '@/components/ui';

interface ProductSummaryProps {
  productCount: number;
  categoryFilter: CategoryFilter;
  searchQuery: string;
  onClearFilters: () => void;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({
  productCount,
  categoryFilter,
  searchQuery,
  onClearFilters,
}) => {
  const getCategoryLabel = (category: CategoryFilter) => {
    const categoryLabels = {
      all: 'همه دسته‌ها',
      WATCH: 'ساعت',
      MOBILE: 'گوشی',
      AIRPODS: 'ایرپاد',
      LAPTOP: 'لپتاب',
      COMPUTER: 'کامپیوتر',
      MONITOR: 'مانیتور',
      OTHERS: 'دیگر',
    };
    return categoryLabels[category];
  };

  const hasActiveFilters = categoryFilter !== 'all' || searchQuery.trim() !== '';

  const getFilterDescription = () => {
    const parts = [];
    
    if (searchQuery.trim()) {
      parts.push(`جستجو: "${searchQuery}"`);
    }
    
    if (categoryFilter !== 'all') {
      parts.push(`دسته: ${getCategoryLabel(categoryFilter)}`);
    }
    
    return parts.join(' | ');
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {productCount} محصول یافت شد
        </span>
        {hasActiveFilters && (
          <span className="text-xs text-gray-500">
            {getFilterDescription()}
          </span>
        )}
      </div>
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <X className="h-3 w-3" />
          پاک کردن فیلترها
        </Button>
      )}
    </div>
  );
};

export default ProductSummary; 
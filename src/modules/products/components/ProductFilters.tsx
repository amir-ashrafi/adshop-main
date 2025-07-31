'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { ChevronDown, Filter, SortAsc, SortDesc } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type SortOption = 'bestselling' | 'price-desc' | 'price-asc' | 'newest' | 'discount-desc';
export type CategoryFilter = 'all' | 'WATCH' | 'MOBILE' | 'AIRPODS' | 'LAPTOP' | 'COMPUTER' | 'MONITOR' | 'OTHERS';

interface ProductFiltersProps {
  sortBy: SortOption;
  categoryFilter: CategoryFilter;
  onSortChange: (sort: SortOption) => void;
  onCategoryChange: (category: CategoryFilter) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  sortBy,
  categoryFilter,
  onSortChange,
  onCategoryChange,
}) => {
  const sortOptions = [
    { value: 'bestselling', label: 'پرفروش ترین', icon: SortDesc },
    { value: 'price-desc', label: 'بیشترین قیمت', icon: SortDesc },
    { value: 'price-asc', label: 'کمترین قیمت', icon: SortAsc },
    { value: 'newest', label: 'جدیدترین', icon: SortDesc },
    { value: 'discount-desc', label: 'بیشترین تخفیف', icon: SortDesc },
  ];

  const categoryOptions = [
    { value: 'all', label: 'همه دسته‌ها' },
    { value: 'WATCH', label: 'ساعت' },
    { value: 'MOBILE', label: 'گوشی' },
    { value: 'AIRPODS', label: 'ایرپاد' },
    { value: 'LAPTOP', label: 'لپتاب' },
    { value: 'COMPUTER', label: 'کامپیوتر' },
    { value: 'MONITOR', label: 'مانیتور' },
    { value: 'OTHERS', label: 'دیگر' },
  ];

  const getSortLabel = (value: SortOption) => {
    return sortOptions.find(option => option.value === value)?.label || 'مرتب‌سازی';
  };

  const getCategoryLabel = (value: CategoryFilter) => {
    return categoryOptions.find(option => option.value === value)?.label || 'همه دسته‌ها';
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start  rounded-lg">
      {/* Category Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {getCategoryLabel(categoryFilter)}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {categoryOptions.map((category) => (
            <DropdownMenuItem
              key={category.value}
              onClick={() => onCategoryChange(category.value as CategoryFilter)}
              className={categoryFilter === category.value ? 'bg-blue-50' : ''}
            >
              {category.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <SortAsc className="h-4 w-4" />
            {getSortLabel(sortBy)}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {sortOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.value as SortOption)}
                className={sortBy === option.value ? 'bg-blue-50' : ''}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {option.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProductFilters; 
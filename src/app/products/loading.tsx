import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
}

function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start p-4 bg-gray-50 rounded-lg mb-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="flex flex-wrap bg-white items-center w-full my-10 px-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="w-[220px] h-[250px] lg:h-[280px] sm:w-[240px] m-2">
            <CardHeader className="h-[120px] flex items-center justify-center">
              <Skeleton className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-lg" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductsLoading;
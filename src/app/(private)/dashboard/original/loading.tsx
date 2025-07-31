// app/dashboard/loading.tsx
'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-10 p-6">
      {/* عنوان داشبورد */}
      <div className="text-right flex items-center justify-center flex-col">
        <Skeleton className="w-40 h-8 mb-2" />
        <Skeleton className="w-64 h-4" />
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-24 w-full rounded-lg" />
        ))}
      </div>

      {/* چارت و مشتریان اخیر */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-80 w-full rounded-lg" />
        <Skeleton className="h-80 w-full rounded-lg" />
      </div>
    </div>
  );
}

import { Suspense } from 'react';
import ProductDashboardView from '@/modules/products/views/ProductDashboardView';
import ProductTableSkeleton from '@/components/l'
function DashboardProductPage() {
  return (
    <Suspense fallback={<ProductTableSkeleton />}>
      <ProductDashboardView />
    </Suspense>
  );
}

export default DashboardProductPage;
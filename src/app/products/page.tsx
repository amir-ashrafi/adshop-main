import { getProducts } from '@/modules/products/services';
import ProductList from '@/modules/products/components/ProductList';
import ProductFiltersWrapper from '@/modules/products/components/ProductFiltersWrapper';
import { ProductsWithImages } from '@/types';
import { SortOption, CategoryFilter } from '@/modules/products/components/ProductFilters';

// تعریف تایپ searchParams با انواع دقیق
interface SearchParams {
  discount?: string;
  sort?: SortOption;
  category?: CategoryFilter;
  search?: string;
}

type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function ProductsPage({ searchParams }: Props) {
  // resolve پرامیس searchParams یا استفاده از مقدار خالی
  const {
    discount = 'false',
    sort = 'name-asc' as SortOption, // تبدیل اجباری به SortOption
    category = 'all' as CategoryFilter,
    search = '',
  } = (await searchParams) ?? {};

  const discountOnly = discount === 'true';
  const sortBy = sort;
  const categoryFilter = category;
  const searchQuery = search;

  const products: ProductsWithImages[] = await getProducts(
    discountOnly,
    sortBy,
    categoryFilter,
    searchQuery
  );

  return (
    <section className="w-full py-10">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 flex flex-col gap-6">
        {discountOnly ? (
          <div className="-mx-4 sm:-mx-6 lg:-mx-12 xl:-mx-20">
            <div className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 py-6 rounded-lg shadow-md text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-vazir">
                پیشنهاد شگفت‌انگیز 🔥
              </h1>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6 mt-10">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-vazir">
                همه محصولات
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                می‌توانید محصولات را فیلتر یا مرتب‌سازی کنید
              </p>
            </div>

            <ProductFiltersWrapper
              initialSortBy={sortBy}
              initialCategoryFilter={categoryFilter}
              initialSearchQuery={searchQuery}
              productCount={products.length}
            />
          </>
        )}

        <ProductList products={products} />
      </div>
    </section>
  );
}

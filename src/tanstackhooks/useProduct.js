import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { productService } from "../services/productService";

// ============================================================
// QUERY KEYS — Clean & Consistent Structure
// ============================================================
export const QUERY_KEYS = {
  all: () => ["products"],

  lists: () => ["products", "list"],
  list: (filters = {}) => ["products", "list", filters],

  details: () => ["products", "detail"],
  detail: (id) => ["products", "detail", id],

  subCategory: (subCategoryId, filters = {}) => [
    "products",
    "subcategory",
    subCategoryId,
    filters,
  ],

  search: (term) => ["products", "search", term],

  infinite: (filters = {}) => ["products", "infinite", filters],
  infiniteSub: (subCategoryId, filters = {}) => [
    "products",
    "infinite",
    "sub",
    subCategoryId,
    filters,
  ],
};

// ============================================================
// 🔍 HELPER — Find single product anywhere in cache
// ============================================================
const findProductInCache = (queryClient, productId) => {
  // 1️⃣ Direct detail cache
  const cached = queryClient.getQueryData(QUERY_KEYS.detail(productId));
  if (cached) return cached;

  // 2️⃣ All list queries
  const listQueries = queryClient.getQueriesData({
    queryKey: QUERY_KEYS.lists(),
  });

  for (const [, data] of listQueries) {
    const found = data?.products?.find(
      (p) => String(p.id) === String(productId)
    );
    if (found) return found;
  }

  // 3️⃣ Subcategory queries
  const subQueries = queryClient.getQueriesData({
    queryKey: ["products", "subcategory"],
  });

  for (const [, data] of subQueries) {
    const found = data?.products?.find(
      (p) => String(p.id) === String(productId)
    );
    if (found) return found;
  }

  // 4️⃣ Infinite queries
  const infiniteQueries = queryClient.getQueriesData({
    queryKey: ["products", "infinite"],
  });

  for (const [, data] of infiniteQueries) {
    if (!data?.pages) continue;

    for (const page of data.pages) {
      const found = page?.products?.find(
        (p) => String(p.id) === String(productId)
      );
      if (found) return found;
    }
  }

  return undefined;
};

// ============================================================
// 🔍 HELPER — Find subcategory products in cache
// ============================================================
const findSubCategoryProductsInCache = (queryClient, subCategoryId) => {
  let matchedProducts = [];

  // From list queries
  const listQueries = queryClient.getQueriesData({
    queryKey: QUERY_KEYS.lists(),
  });

  for (const [, data] of listQueries) {
    if (!data?.products) continue;

    matchedProducts.push(
      ...data.products.filter(
        (p) => String(p.subCategoryId) === String(subCategoryId)
      )
    );
  }

  // From infinite queries
  const infiniteQueries = queryClient.getQueriesData({
    queryKey: ["products", "infinite"],
  });

  for (const [, data] of infiniteQueries) {
    if (!data?.pages) continue;

    for (const page of data.pages) {
      matchedProducts.push(
        ...(page?.products?.filter(
          (p) => String(p.subCategoryId) === String(subCategoryId)
        ) ?? [])
      );
    }
  }

  if (matchedProducts.length > 0) {
    // Remove duplicates
    const unique = matchedProducts.filter(
      (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i
    );

    return {
      products: unique,
      lastDoc: null,
      hasMore: false,
    };
  }

  return undefined;
};

// ============================================================
// 🟢 1. GET ALL PRODUCTS
// ============================================================
export const useProducts = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.list(options),
    queryFn: () => productService.getAll(options),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// ============================================================
// 🟢 2. GET SINGLE PRODUCT — Instant from cache
// ============================================================
export const useProduct = (id) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => productService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,

    // ⭐ Instant UI, background refetch
    placeholderData: () => findProductInCache(queryClient, id),
  });
};

// ============================================================
// 🟢 3. GET PRODUCTS BY SUBCATEGORY — Instant
// ============================================================
export const useProductsBySubCategory = (subCategoryId, options = {}) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.subCategory(subCategoryId, options),
    queryFn: () => productService.getBySubCategoryId(subCategoryId, options),
    enabled: !!subCategoryId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,

    placeholderData: () =>
      findSubCategoryProductsInCache(queryClient, subCategoryId) ?? {
        products: [],
        lastDoc: null,
        hasMore: false,
      },
  });
};


// ============================================================
// 🟢 4. INFINITE SCROLL — ALL PRODUCTS
// ============================================================
export const useInfiniteProducts = (options = {}) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.infinite(options),
    queryFn: ({ pageParam = null }) =>
      productService.getAll({ ...options, lastDoc: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastDoc : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// ============================================================
// 🟢 5. INFINITE SCROLL — SUBCATEGORY
// ============================================================
export const useInfiniteProductsBySubCategory = (
  subCategoryId,
  options = {}
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.infiniteSub(subCategoryId, options),
    queryFn: ({ pageParam = null }) =>
      productService.getBySubCategoryId(subCategoryId, {
        ...options,
        lastDoc: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastDoc : undefined,
    enabled: !!subCategoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// ============================================================
// 🚀 PREFETCH PRODUCT (Use on hover)
// ============================================================
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  return (productId) => {
    const existing = queryClient.getQueryData(
      QUERY_KEYS.detail(productId)
    );

    if (existing) return;

    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.detail(productId),
      queryFn: () => productService.getById(productId),
      staleTime: 10 * 60 * 1000,
    });
  };
};

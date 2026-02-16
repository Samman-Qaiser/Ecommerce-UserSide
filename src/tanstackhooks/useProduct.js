import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';

const QUERY_KEYS = {
  all: ['products'],
  byId: (id) => ['products', id],
  bySubCategory: (subCategoryId) => ['products', 'subcategory', subCategoryId],
  search: (term) => ['products', 'search', term],
  infinite: (filters) => ['products', 'infinite', filters],
};

// ⭐ GET ALL PRODUCTS (with filters & pagination)
export const useProducts = (options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.all, options],
    queryFn: () => productService.getAll(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000,
  });
};

// ⭐ GET SINGLE PRODUCT BY ID
export const useProduct = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.byId(id),
    queryFn: () => productService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
  });
};

// ⭐ GET PRODUCTS BY SUBCATEGORY ID
export const useProductsBySubCategory = (subCategoryId, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.bySubCategory(subCategoryId), options],
    queryFn: () => productService.getBySubCategoryId(subCategoryId, options),
    enabled: !!subCategoryId,
    staleTime: Infinity,         // ✅ Cache forever
    gcTime: 30 * 60 * 1000,      // ✅ 30 min
    refetchOnMount: false,       
    refetchOnWindowFocus: false,
   
  });
};

// ⭐ SEARCH PRODUCTS
export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: QUERY_KEYS.search(searchTerm),
    queryFn: () => productService.search(searchTerm),
    enabled: !!searchTerm && searchTerm.length > 2, // Only search if term has 3+ characters
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000,
  });
};

// ⭐ INFINITE SCROLL PRODUCTS (for load more functionality)
export const useInfiniteProducts = (options = {}) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.infinite(options),
    queryFn: ({ pageParam = null }) => 
      productService.getAll({ 
        ...options, 
        lastDoc: pageParam 
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.lastDoc : undefined;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// ⭐ INFINITE SCROLL BY SUBCATEGORY
export const useInfiniteProductsBySubCategory = (subCategoryId, options = {}) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.bySubCategory(subCategoryId), 'infinite', options],
    queryFn: ({ pageParam = null }) => 
      productService.getBySubCategoryId(subCategoryId, { 
        ...options, 
        lastDoc: pageParam 
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.lastDoc : undefined;
    },
    enabled: !!subCategoryId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
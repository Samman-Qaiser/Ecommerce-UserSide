import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subCategoryService } from '../services/subcategoryService';
export { useActiveCategories } from './useCategories';

const QUERY_KEYS = {
  all: ['subcategories'],
  active: ['subcategories', 'active'],
  featured: ['subcategories', 'featuredSubCategories'],
  bestSeller: ['subcategories', 'bestSubCategories'],
  topRated: ['subcategories', 'topratedSubCategories'],
  byCategory: (categoryId) => ['subcategories', 'category', categoryId],
  byId: (id) => ['subcategories', 'detail', id],
  bySlug: (slug) => ['subcategories', 'slug', slug],  // ✅ Added
  byName: (name) => ['subcategories', 'name', name],  // ✅ Added
  categories: {
    active: ['categories', 'active'],
  }
}

// GET ALL SUBCATEGORIES (Admin)
export const useSubCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: subCategoryService.getAll,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000,
  });
};

// GET ACTIVE SUBCATEGORIES (User-facing)
export const useActiveSubCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.active,
    queryFn: subCategoryService.getActive,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000,
  });
};

// GET FEATURED SUBCATEGORIES
export const useFeaturedSubCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.featured,
    queryFn: subCategoryService.getFeatured,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000,
  });
};

// GET BEST SELLER SUBCATEGORIES
export const useBestSubCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.bestSeller,
    queryFn: subCategoryService.getbestSeller,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000,
  });
};

// GET TOP RATED SUBCATEGORIES
export const useTopSubCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.topRated,
    queryFn: subCategoryService.gettopRated,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000,
  });
};

// GET SUBCATEGORIES BY CATEGORY
export const useSubCategoriesByCategory = (categoryId) => {
  return useQuery({
    queryKey: QUERY_KEYS.byCategory(categoryId),
    queryFn: () => subCategoryService.getByCategory(categoryId),
    enabled: !!categoryId, // Only run if categoryId exists
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000,
  });
};

// ✅ GET SINGLE SUBCATEGORY BY ID
export const useSubCategory = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.byId(id),
    queryFn: () => subCategoryService.getById(id),
    enabled: !!id, // Only run if ID exists
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
  });
};

// ✅ GET SUBCATEGORY BY SLUG (Fixed)
export const useSubCategoryBySlug = (slug) => {
  return useQuery({
    queryKey: QUERY_KEYS.bySlug(slug),
    queryFn: () => subCategoryService.getBySlug(slug),
   enabled: !!slug,
   
    staleTime: Infinity,        // ✅ Data kabhi stale nahi hoga
    gcTime: 30 * 60 * 1000,     // ✅ 30 min tak cache mein rahega
    refetchOnMount: false,      // ✅ Mount par refetch nahi
    refetchOnWindowFocus: false, // ✅ Tab switch par refetch nahi

  });
};

// ✅ GET SUBCATEGORY BY NAME
export const useSubCategoryByName = (name) => {
  return useQuery({
    queryKey: QUERY_KEYS.byName(name),
    queryFn: () => subCategoryService.getByName(name),
   
  
  });
};
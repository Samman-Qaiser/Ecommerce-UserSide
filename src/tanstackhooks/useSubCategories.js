import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subCategoryService } from '../services/subcategoryService';
export { useActiveCategories } from './useCategories';
const QUERY_KEYS = {
  all: ['subcategories'],
  active: ['subcategories', 'active'],
  byCategory: (categoryId) => ['subcategories', 'category', categoryId],
  categories: {
    active: ['categories', 'active'],
  }
}

// GET ALL SUBCATEGORIES (Admin)
export const useSubCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: subCategoryService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// GET ACTIVE SUBCATEGORIES (User-facing)
export const useActiveSubCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.active,
    queryFn: subCategoryService.getActive,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// GET SUBCATEGORIES BY CATEGORY
export const useSubCategoriesByCategory = (categoryId) => {
  return useQuery({
    queryKey: QUERY_KEYS.byCategory(categoryId),
    queryFn: () => subCategoryService.getByCategory(categoryId),
    enabled: !!categoryId, // Only run if categoryId exists
    staleTime: 5 * 60 * 1000,
  });

  
};
// GET SINGLE CATEGORY
export const useSubCategory = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => subCategoryService.getById(id),
    enabled: !!id, // Only run if ID exists
  });}
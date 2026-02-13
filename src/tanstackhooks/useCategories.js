import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';

// Query Keys (centralized)
const QUERY_KEYS = {
  all: ['categories'],
  active: ['categories', 'active'],
  detail: (id) => ['categories', id],
};

export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: categoryService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

// GET ACTIVE CATEGORIES (User-facing)
export const useActiveCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.active,
    queryFn: categoryService.getActive,
    staleTime: 10 * 60 * 1000, // 10 minutes cache (rarely changes)
  });
};

// GET SINGLE CATEGORY
export const useCategory = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => categoryService.getById(id),
    enabled: !!id, // Only run if ID exists
  });
};
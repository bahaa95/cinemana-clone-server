import { Middleware } from '@/types';

export interface CategoryController {
  addCategory: Middleware;
  editCategory: Middleware;
  deleteCategory: Middleware;
  getCategories: Middleware;
}

import { CategoryDocument, ICategory } from '../model';
import { ObjectId } from '@/types';

export interface CategoryService {
  addCategory: (category: ICategory) => Promise<CategoryDocument>;
  editCategory: (
    _id: ObjectId,
    category: ICategory,
  ) => Promise<CategoryDocument | null>;
  deleteCategory: (_id: ObjectId) => Promise<CategoryDocument | null>;
  getCategories: () => Promise<CategoryDocument[]>;
  isExist: (title: ICategory['title'], _id?: ObjectId) => Promise<boolean>;
}

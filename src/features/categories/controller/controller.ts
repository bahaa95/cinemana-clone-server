import { Request } from 'express';
import { Middleware, ObjectId } from '@/types';
import { ICategoryService } from '../service';
import { CategoryController as ICategoryController } from './types';
import { AddCategorySchema, EditCategorySchema } from '../types';
import { HttpError, statuses } from '@/lib/httperror';

export class CategoryController implements ICategoryController {
  private readonly categoryService: ICategoryService;

  constructor(_categoryService: ICategoryService) {
    this.categoryService = _categoryService;
  }

  addCategory: Middleware = async (
    req: Request<{}, {}, AddCategorySchema['body']>,
    res,
    next,
  ) => {
    try {
      const data = req.body;

      // save category to database
      const newCategory = await this.categoryService.addCategory(data);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  };

  editCategory: Middleware = async (
    req: Request<any, {}, EditCategorySchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = req.params._id as ObjectId;
      const data = req.body;

      // edit category
      const editCategory = await this.categoryService.editCategory(_id, data);

      // throw HttpError if category not found
      if (!editCategory) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Edit failed. Category with _id "${_id}" not found.`,
          feature: 'categories',
        });
      }

      res.status(200).json(editCategory);
    } catch (error) {
      next(error);
    }
  };

  deleteCategory: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = req.params._id as ObjectId;
      // delete the category from database
      const deletedCategory = await this.categoryService.deleteCategory(_id);

      // throw HttpError if category not found
      if (!deletedCategory) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Delete failed. Category with _id "${_id}" not found.`,
          feature: 'categories',
        });
      }

      res.status(200).json(deletedCategory);
    } catch (error) {
      next(error);
    }
  };

  getCategories: Middleware = async (req, res, next) => {
    try {
      // get categories from database
      const categories = await this.categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };

  shouldNotExistBefore: Middleware = async (
    req: Request<any, {}, AddCategorySchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = req.params._id as ObjectId | undefined;
      const { title } = req.body;

      // check if category is already exists
      const isExist = await this.categoryService.isExist(title, _id);

      // throw HttpError if category already exists
      if (isExist) {
        throw new HttpError({
          status: statuses.Conflict,
          message: `Category with title ${title} already exists.`,
          feature: 'categories',
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

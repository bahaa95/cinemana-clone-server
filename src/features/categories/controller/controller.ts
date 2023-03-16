import { Request } from 'express';
import { Middleware, ObjectId } from '@/types';
import { ICategoryService } from '../service';
import { CategoryController as ICategoryController } from './types';
import { AddCategorySchema, EditCategorySchema } from '../validation';
import { HttpError, statuses } from '@/lib/httperror';
import { convertToObjectId } from '@/utils/convertToObjectId';

export class CategoryController implements ICategoryController {
  private readonly categoryService: ICategoryService;

  constructor(_categoryService: ICategoryService) {
    this.categoryService = _categoryService;
  }

  public addCategory: Middleware = async (
    req: Request<{}, {}, AddCategorySchema['body']>,
    res,
    next,
  ) => {
    try {
      const { title } = req.body;

      // save category to database
      let newCategory = await this.categoryService.addCategory({ title });
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  };

  public editCategory: Middleware = async (
    req: Request<any, {}, EditCategorySchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);
      const { title } = req.body;

      // edit category
      let editCategory = await this.categoryService.editCategory(_id, {
        title,
      });

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

  public deleteCategory: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = convertToObjectId(req.params._id);

      // delete the category from database
      let deletedCategory = await this.categoryService.deleteCategory(_id);

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

  public getCategories: Middleware = async (req, res, next) => {
    try {
      // get categories from database
      let categories = await this.categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };
}

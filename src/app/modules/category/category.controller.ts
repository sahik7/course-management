import httpStatus from 'http-status'
import catchAsync from '../../utilities/catchAsync'
import responseHandler from '../../utilities/responseHandle'
import { CategoryService } from './category.service'

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryIntoDb(req.body)
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result
  })
})
const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryService.getCategoriesFromDb()
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result
  })
})

export const CategoryController = {
  createCategory,
  getAllCategories,
}

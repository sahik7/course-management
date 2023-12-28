import { Category } from './category.model'

const createCategoryIntoDb = async (payload: ICategory) => {
  const course = await Category.create(payload)
  return course
}

const getCategoriesFromDb = async () => {
  const categories = await Category.find()
  return categories
}

export const CategoryService = {
  createCategoryIntoDb,
  getCategoriesFromDb,
}

import httpStatus from 'http-status'
import catchAsync from '../../utilities/catchAsync'
import responseHandler from '../../utilities/responseHandle'
import { CourseService } from './course.service'

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDb(req.body)
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  })
})

const getCourseIdAndReview = catchAsync(async (req, res) => {
  const result = await CourseService.findCourseWithReviewFromDb(
    req.params.courseId,
  )
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  })
})

const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseService.findBestCourseWithReviewFromDb()
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result,
  })
})

const getFilteredCourse = catchAsync(async (req, res) => {
  const result = await CourseService.findCoursesFromDb(req.query)
  const allData = await CourseService.findAllDataFromDb()
  const page = req?.query?.page || 1
  const limit = req?.query?.limit || 10
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      total: allData.length,
    },
    data: result,
  })
})

const modifyCourse = catchAsync(async (req, res) => {
  const result = await CourseService.modifyCourseIntoDb(
    req.params.courseId,
    req.body,
  )
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  })
})

export const CourseController = {
  createCourse,
  getBestCourse,
  modifyCourse,
  getFilteredCourse,
  getCourseIdAndReview,
}

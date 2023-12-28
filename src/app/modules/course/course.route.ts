import express from 'express'
import { CourseController } from './course.controller'
import validateReq from '../../../middlewares/validateReq'
import { courseValidationSchema } from './course.validation'
import { calculateDurationInWeeks } from '../../../middlewares/calculateDurationInWeeks'

const router = express.Router()

router.post(
  '/course',
  calculateDurationInWeeks,
  validateReq(courseValidationSchema.createCourseValidationSchema),
  CourseController.createCourse,
)
router.get('/course/best', CourseController.getBestCourse)
router.get('/courses', CourseController.getFilteredCourse)
router.get('/courses/:courseId/reviews', CourseController.getCourseIdAndReview)
router.put('/courses/:courseId', validateReq(courseValidationSchema.updateCourseValidationSchema), CourseController.modifyCourse)

export const CourseRoutes = router

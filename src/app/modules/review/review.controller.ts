import httpStatus from 'http-status'
import catchAsync from '../../utilities/catchAsync'
import responseHandler from '../../utilities/responseHandle'
import { ReviewService } from './review.service'

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewService.createReviewIntoDb(req.body)
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result,
  })
})

export const ReviewController = {
  createReview,
}

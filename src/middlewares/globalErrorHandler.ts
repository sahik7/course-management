import { ErrorRequestHandler } from 'express'
import { IError } from '../error/error.interface'
import { ZodError } from 'zod'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorHandle: IError = {
    success: false,
    message: err.name || 'error',
    errorMessage: err.message || 'Something went wrong',
    errorDetails: err.issues || [],
  }
  if (err instanceof ZodError) {
    const errorMessage = err.issues.map(err => {
      return `${err.path[1]} is ${err.message}`
    })
    errorHandle.message = 'Validation Error'
    errorHandle.errorMessage = errorMessage.join('. ')
    errorHandle.errorDetails = err
  } else if (err?.name === 'ValidationError') {
    const errorValidation = Object.values(err.errors).map(value => {
      return value
    })
    errorHandle.errorDetails = errorValidation
  } else if (err?.name === 'CastError') {
    errorHandle.message = err.name
    errorHandle.errorMessage = `${err.message.split('"')[1]} is not a valid ID!`
  } else if (err?.code === 11000) {
    errorHandle.message = 'Duplicate Entry'
    const matches = err.message.match(/"([^"]*)"/)
    const finalMsg = matches && matches[1]
    errorHandle.errorMessage = `${finalMsg} is already exists`
    errorHandle.errorDetails = err
  }

  res
    .status(500)
    .json({
      success: errorHandle.success,
      message: errorHandle.message,
      errorMessage: errorHandle.errorMessage,
      errorDetails: errorHandle.errorDetails,
      stack: err?.stack,
    })
}

export default globalErrorHandler

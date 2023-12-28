import { Response } from 'express'

interface IResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}

const responseHandler = <T>(res: Response, data: IResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  })
}

export default responseHandler

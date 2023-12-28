import { NextFunction, Request, Response } from 'express'

export const calculateDurationInWeeks = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startDate = new Date(req.body.startDate)
  const endDate = new Date(req.body.endDate)
  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000
  const durationInWeeks = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / millisecondsInWeek,
  )
  req.body.durationInWeeks = durationInWeeks
  next()
}

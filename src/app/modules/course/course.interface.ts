import { Types } from 'mongoose'

export interface ITags {
  name: string
  isDeleted: boolean
}

export type ILevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface ICourse {
  title: string
  instructor: string
  categoryId: Types.ObjectId
  price: number
  tags: ITags[]
  startDate: string
  endDate: string
  language: string
  provider: string
  durationInWeeks?: number
  details: {
    level: ILevel
    description: string
  }
}

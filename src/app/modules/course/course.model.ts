import { Schema, model } from 'mongoose'
import { ICourse, ITags } from './course.interface'

const tagsSchema = new Schema<ITags>({
  name: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    price: { type: Number, required: true },
    tags: [tagsSchema],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number, required: true },
    details: {
      level: {
        type: String,
        enum: {
          values: ['Beginner', 'Intermediate', 'Advanced'],
          message: '{VALUE} is not a valid level',
        },
        required: true,
      },
      description: { type: String, required: true },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

courseSchema.pre('save', function (next) {
  if (typeof this.durationInWeeks === 'undefined') {
    const startDate: Date = new Date(this.startDate)
    const endDate: Date = new Date(this.endDate)
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000
    this.durationInWeeks = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / millisecondsInWeek,
    )
  }

  next()
})

export const Course = model<ICourse>('Course', courseSchema)

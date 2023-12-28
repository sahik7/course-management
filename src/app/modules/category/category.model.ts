import { Schema, model } from 'mongoose'

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
})

export const Category = model<ICategory>('Category', categorySchema)

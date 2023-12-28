import mongoose from 'mongoose'
import { ICourse, ITags } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDb = async (payload: ICourse) => {
    const course = await Course.create(payload)
    return course
}

const findBestCourseWithReviewFromDb = async () => {
    const courses = await Course.aggregate([
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'courseId',
                as: 'reviews',
            },
        },
        {
            $unwind: {
                path: '$reviews',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: '$_id',
                course: {
                    $first: {
                        _id: '$_id',
                        title: '$title',
                        instructor: '$instructor',
                        categoryId: '$categoryId',
                        price: '$price',
                        tags: '$tags',
                        startDate: '$startDate',
                        endDate: '$endDate',
                        language: '$language',
                        provider: '$provider',
                        durationInWeeks: '$durationInWeeks',
                        details: '$details',
                    },
                },
                reviews: { $push: '$reviews' },
            },
        },
        {
            $addFields: {
                averageRating: { $avg: '$reviews.rating' },
                reviewCount: { $size: '$reviews' },
            },
        },
        {
            $project: {
                _id: 0,
                reviews: 0
            }
        },
        {
            $sort: { averageRating: -1 },
        },
        {
            $limit: 1,
        },
    ])

    return courses[0]
}

const findCourseWithReviewFromDb = async (payload: string) => {
    const courses = await Course.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(payload) },
        },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'courseId',
                as: 'reviews',
            },
        },
        {
            $unwind: {
                path: '$reviews',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: '$_id',
                course: {
                    $first: {
                        _id: '$_id',
                        title: '$title',
                        instructor: '$instructor',
                        categoryId: '$categoryId',
                        price: '$price',
                        tags: '$tags',
                        startDate: '$startDate',
                        endDate: '$endDate',
                        language: '$language',
                        provider: '$provider',
                        durationInWeeks: '$durationInWeeks',
                        details: '$details',
                    },
                },
                reviews: { $push: '$reviews' },
            },
        },
        {
            $project: {
                _id: 0,
            }
        },
        {
            $sort: { averageRating: -1 },
        },
        {
            $limit: 1,
        },
    ])

    return courses[0]
}

const findAllDataFromDb = async () => {
    const result = await Course.find()
    return result
}

const findCoursesFromDb = async (
    query: Record<string, unknown>,
): Promise<ICourse[]> => {
    const queryObj = { ...query }
    const queryLanguage = queryObj?.language
    const queryProvider = queryObj?.provider
    const queryDurationInWeeks = queryObj?.durationInWeeks
    const queryStartDate = queryObj?.startDate
    const queryEndDate = queryObj?.endDate
    const queryMinPrice = queryObj?.minPrice
    const queryMaxPrice = queryObj?.maxPrice
    const sortOrderQuery = queryObj?.sortOrder
    const tagsQuery = queryObj?.tags
    let sortByQuery = queryObj?.sortBy
    const page = (queryObj?.page || 1) as number
    const limit = (queryObj?.limit || 10) as number
    if (queryObj?.level) {
        const result = await Course.find({ 'details.level': queryObj?.level }).skip((page - 1) * limit)
            .limit(limit * 1)
        return result
    } else if (queryStartDate && queryEndDate) {
        const result = await Course.find({
            $and: [
                { startDate: { $gte: queryStartDate } },
                { endDate: { $lte: queryEndDate } },
            ],
        }).skip((page - 1) * limit)
            .limit(limit * 1)
        return result
    } else if (queryMinPrice && queryMaxPrice) {
        const result = await Course.find({
            price: { $gte: queryMinPrice, $lte: queryMaxPrice },
        }).skip((page - 1) * limit)
            .limit(limit * 1)
        return result
    }
    else if (queryProvider) {
        const result = await Course.find({
            provider: queryProvider
        }).skip((page - 1) * limit)
            .limit(limit * 1)
        return result
    }
    else if (queryDurationInWeeks) {
        const result = await Course.find({
            durationInWeeks: queryDurationInWeeks
        }).skip((page - 1) * limit)
            .limit(limit * 1)
        return result
    }
    else if (sortByQuery) {
        if (
            sortByQuery === 'title' ||
            sortByQuery === 'price' ||
            sortByQuery === 'startDate' ||
            sortByQuery === 'endDate' ||
            sortByQuery === 'language' ||
            sortByQuery === 'durationInWeeks'
        ) {
            if (sortOrderQuery === 'asc') {
                const result = await Course.find().skip((page - 1) * limit)
                    .limit(limit * 1).sort({
                        [sortByQuery as string]: 1,
                    })
                return result
            } else if (sortOrderQuery === 'desc') {
                const result = await Course.find().skip((page - 1) * limit)
                    .limit(limit * 1).sort({
                        [sortByQuery as string]: -1,
                    })
                return result
            } else {

                const result = await Course.find().skip((page - 1) * limit)
                    .limit(limit * 1).sort({
                        [sortByQuery as string]: 1,
                    })
                return result

            }
        } else {
            return []
        }
    }
    else if (queryLanguage) {
        const result = await Course.find({ language: queryLanguage }).skip((page - 1) * limit)
            .limit(limit * 1)
        return result
    }
    else if (tagsQuery) {
        const result = await Course.aggregate([
            { $unwind: '$tags' },
            { $match: { 'tags.name': tagsQuery } },
            { $skip: (page - 1) * limit },
            { $limit: limit * 1 }
        ]);
        return result
    } else {
        const result = await Course.find().skip((page - 1) * limit)
            .limit(limit * 1)
        return result
    }
}

const modifyCourseIntoDb = async (id: string, payload: Partial<ICourse>) => {
    const { details, tags, ...rest } = payload

    const modifiedData: Record<string, unknown> = { ...rest }

    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            modifiedData[`details.${key}`] = value
        }
    }



    if (tags && Array.isArray(tags)) {
        const existingCourse = await Course.findById(id);

        if (existingCourse) {
            const updatedTags = existingCourse.tags;

            tags.forEach(newTag => {
                const matchingIndex = updatedTags.findIndex(existingTag => existingTag.name === newTag.name);

                if (matchingIndex !== -1) {
                    // If name matched and new tag is marked as deleted, remove the existing tag
                    if (newTag.isDeleted) {
                        updatedTags.splice(matchingIndex, 1);
                    }
                    // If name matched and new tag is not marked as deleted, no changes needed
                } else {
                    // If name didn't match and new tag is not marked as deleted, add the new tag
                    if (!newTag.isDeleted) {
                        updatedTags.push(newTag);
                    }
                    // If name didn't match and new tag is marked as deleted, no changes needed
                }
            });

            modifiedData.tags = updatedTags;
        }
    }



    const updatedCourse = await Course.findOneAndUpdate(
        { _id: id },
        modifiedData,
        { new: true, runValidators: true },
    )
    return updatedCourse
}

export const CourseService = {
    createCourseIntoDb,
    modifyCourseIntoDb,
    findCoursesFromDb,
    findAllDataFromDb,
    findBestCourseWithReviewFromDb,
    findCourseWithReviewFromDb,
}

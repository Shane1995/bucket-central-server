import { CategoryDto, CategoryTopicDto } from '@/types/types'
import { Category, Topic } from '@prisma/client'
import HttpException from '../exceptions/HttpException'
import prisma from '../database/db'

function prismaCategory() {
  return prisma.category
}

/**
 * Fetches all Categories
 * @async
 * @returns Promise<Category[]>
 */
export async function fetchAll(): Promise<Category[]> {
  try {
    return await prismaCategory().findMany()
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

/**
 * Fetches all Categories with there associated topics
 * @async
 * @returns Promise<(Category & {topics: Topic[]})[]>
 */
export async function fetchAllWithTopics(): Promise<
  (Category & {
    topics: Topic[]
  })[]
> {
  try {
    return await prismaCategory().findMany({
      include: {
        topics: {}
      }
    })
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

/**
 * Fetches a Category by Id,
 * Option to include Topics associated which that category
 * @async
 * @returns Promise<(Category & {topics: Topic[]})[]>
 */
export async function fetchById(id: number, fields: any) {
  try {
    if (isNaN(id)) {
      throw new HttpException(404, 'Id must be a number')
    }
    let query = {
      where: {
        id: id
      }
    }

    if (typeof fields !== 'undefined' && fields === 'topic') {
      const includes = {
        include: {
          topics: {}
        }
      }
      query = { ...query, ...includes }
    }

    return await prismaCategory().findOne({
      ...query
    })
  } catch (error) {
    throw new HttpException(error.status)
  }
}

export async function create(cat: CategoryDto) {
  try {
    const newCategory = await prismaCategory().create({
      data: {
        name: cat.name,
        description: cat.description
      }
    })

    return newCategory
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

export async function createWithTopic(cat: CategoryTopicDto) {
  try {
    const newCategory = await prismaCategory().create({
      data: {
        name: cat.name,
        description: cat.description,
        topics: {
          create: [...cat.topics]
        }
      }
    })

    return newCategory
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

export async function removeById(id: number) {
  try {
    if (isNaN(id)) {
      throw { status: 404, message: 'Id must be a number' }
    }
    const topics = await prisma.topic.findFirst({
      where: {
        categoryId: id
      }
    })
    await prisma.command.deleteMany({
      where: {
        topicId: topics?.id
      }
    })
    await prisma.topic.delete({
      where: {
        id: topics?.id
      }
    })
    await prismaCategory().delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

export async function updateById(id: number, cat: CategoryDto) {
  try {
    if (isNaN(id)) {
      throw { status: 404, message: 'Id must be a number' }
    }
    const newCategory = await prismaCategory().update({
      where: {
        id: id
      },
      data: {
        name: cat.name,
        description: cat.description
      }
    })

    return newCategory
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

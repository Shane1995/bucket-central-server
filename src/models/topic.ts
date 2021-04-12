import { TopicCommandDto, TopicDto } from '@/types/types'
import { Command, Topic } from '@prisma/client'
import HttpException from '../exceptions/HttpException'
import prisma from '../database/db'

/**
 * @returns An Array of all Topics including the associated commands
 */
export async function fetchAll(): Promise<
  (Topic & {
    commands: Command[]
  })[]
> {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        commands: {}
      }
    })
    return topics
  } catch (error) {
    throw new HttpException()
  }
}

/**
 * Gets a topic by Id
 * @async
 * @param {id}
 * @returns a Topic or null if not founded
 */
export async function fetchById(
  id: number
): Promise<
  | (Topic & {
      commands: Command[]
    })
  | null
> {
  try {
    const topic = await prisma.topic.findOne({
      where: {
        id: id
      },
      include: {
        commands: {}
      }
    })
    return topic
  } catch (error) {
    console.log(error)

    throw new HttpException(error.status, error.message)
  }
}

/**
 * Update one Topic.
 * @async
 * @param id the topic unique identifier
 * @param tp Type TopicDto
 * @returns The newly updated topic
 */
export const update = async (id: number, tp: TopicDto): Promise<Topic> => {
  try {
    const topic = await prisma.topic.update({
      where: {
        id: id
      },
      data: {
        name: tp.name,
        description: tp.description
      }
    })
    return topic
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

/**
 * Creates a Topic.
 * @async
 * @param tp Type TopicDto
 * @returns The newly created topic
 */
export const create = async (tp: TopicDto): Promise<Topic> => {
  try {
    const topic = await prisma.topic.create({
      data: {
        name: tp.name,
        description: tp.description,
        category: {
          connect: {
            id: tp.categoryId
          }
        }
      }
    })
    return topic
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

/**
 * Creates a Topic With a Command/s.
 * @async
 * @param tp Type TopicCommandDto
 * @returns The newly created topic
 */
export const createWithCommand = async (tp: TopicCommandDto): Promise<Topic> => {
  try {
    const topic = await prisma.topic.create({
      data: {
        name: tp.name,
        description: tp.description,
        commands: {
          create: [...tp.commands]
        },
        category: {
          connect: {
            id: tp.categoryId
          }
        }
      }
    })
    return topic
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

/**
 * Delete a Topic.
 * @param id unique identifier used to delete a Topic
 */
export const deleteById = async (id: number): Promise<void> => {
  try {
    await prisma.command.deleteMany({
      where: {
        topicId: id
      }
    })
    await prisma.topic.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

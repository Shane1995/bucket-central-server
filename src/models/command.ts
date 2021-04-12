import { CommandDto } from '@/types/types'
import HttpException from '../exceptions/HttpException'
import prisma from '../database/db'

export const update = async (id: number, cmd: CommandDto) => {
  try {
    await prisma.command.update({
      where: {
        id: id
      },
      data: {
        command: cmd.command,
        description: cmd.description
      }
    })

    return {
      id,
      data: {
        ...cmd
      }
    }
  } catch (error) {
    throw new HttpException(500, error)
  }
}

export const create = async (cmd: CommandDto) => {
  try {
    const addCommand = await prisma.command.create({
      data: {
        command: cmd.command,
        description: cmd.description,
        Topic: {
          connect: {
            id: cmd.topicId
          }
        }
      }
    })

    return addCommand
  } catch (error) {
    throw new HttpException(500, error)
  }
}

export const fetchAll = async () => {
  try {
    const commands = await prisma.command.findMany()
    return commands
  } catch (error) {
    throw new HttpException(error.status, error.message)
  }
}

export const fetchById = async (id: number) => {
  try {
    const command = await prisma.command.findFirst({
      where: {
        id: id
      }
    })
    return command
  } catch (error) {
    throw new HttpException(
      error.status,
      error.status === 404 ? 'Not Found' : 'Server Error'
    )
  }
}

export const deleteById = async (id: number) => {
  try {
    await prisma.command.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    throw new HttpException(500, 'failed to delete')
  }
}

import { CommandDto } from '@/types/types'
import { Request, Response, NextFunction } from 'express'

import {
  create,
  update,
  fetchAll,
  fetchById,
  deleteById
} from '../models/command'

export const post = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const newCommand: CommandDto = req.body
    resp.status(201).json(await create(newCommand))
  } catch (error) {
    next(error)
  }
}

export const postMany = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const newCommand: CommandDto = req.body
    resp.status(201).json(await create(newCommand))
  } catch (error) {
    next(error)
  }
}

export const put = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const id: number = +req.params.id
    const newCommand: CommandDto = req.body
    resp.status(200).json(await update(id, newCommand))
  } catch (error) {
    next(error)
  }
}

export const getAll = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    resp.status(200).json(await fetchAll())
  } catch (error) {
    next(error)
  }
}

export const getById = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const id: number = +req.params.id
    const command = await fetchById(id)
    resp.status(200).json(command)
  } catch (error) {
    next(error)
  }
}

export const removeById = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const id = +req.params.id
    await deleteById(id)
    resp.status(200).end()
  } catch (error) {
    next(error)
  }
}

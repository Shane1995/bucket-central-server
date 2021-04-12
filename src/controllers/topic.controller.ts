import { TopicCommandDto, TopicDto } from '@/types/types'
import { Request, Response, NextFunction } from 'express'

import { fetchAll, fetchById, update, create, deleteById, createWithCommand } from '../models/topic'

export const post = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const newTopic: TopicDto = { ...req.body }
    resp.status(201).json(await create(newTopic))
  } catch (error) {
    next(error)
  }
}

export const postWithCommand = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const newTopic: TopicCommandDto = { ...req.body }
    resp.status(201).json(await createWithCommand(newTopic))
  } catch (error) {
    next(error)
  }
}

export const put = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const id = +req.params.id
    const newTopic: TopicDto = { ...req.body }
    resp.status(200).json(await update(id, newTopic))
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    resp.status(201).json(await fetchAll())
  } catch (error) {
    next(error)
  }
}

export const getById = async (req: Request, resp: Response, next: NextFunction) => {
  const id = +req.params.id
  try {
    resp.status(202).json(await fetchById(id))
  } catch (error) {
    next(error)
  }
}

export const removeById = async (req: Request, resp: Response, next: NextFunction) => {
  const id = +req.params.id
  try {
    resp.status(200).json(await deleteById(id))
  } catch (error) {
    next(error)
  }
}

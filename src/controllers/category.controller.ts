import { CategoryDto, CategoryTopicDto } from '@/types/types'
import { Category } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

import { fetchAll, fetchAllWithTopics, create, createWithTopic, fetchById, removeById } from '../models/category'

export async function getAll(req: Request, resp: Response, next: NextFunction) {
  try {
    const categories: Category[] = await fetchAll()
    return resp.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

export async function getAllWithTopic(req: Request, resp: Response, next: NextFunction) {
  try {
    const categoriesWithTopics = await fetchAllWithTopics()
    return resp.status(200).json(categoriesWithTopics)
  } catch (error) {
    next(error)
  }
}

export async function getById(req: Request, resp: Response, next: NextFunction) {
  try {
    const fieldsParams = req.query.fields as any
    const id = +req.params.id
    const categories = await fetchById(id, fieldsParams)
    resp.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

export async function postCategory(req: Request, resp: Response, next: NextFunction) {
  try {
    const catDto: CategoryDto = { ...req.body }
    const newCategory = await create(catDto)
    return resp.status(201).json(newCategory)
  } catch (error) {
    next(error)
  }
}

export async function postCategoryWithTopic(req: Request, resp: Response, next: NextFunction) {
  try {
    const catTopic: CategoryTopicDto = { ...req.body }
    const newCat = await createWithTopic(catTopic)
    return resp.status(201).json(newCat)
  } catch (error) {
    next(error)
  }
}

export async function deleteById(req: Request, resp: Response, next: NextFunction) {
  try {
    const id = +req.params.id
    await removeById(id)
    return resp.status(200).end()
  } catch (error) {
    next(error)
  }
}

import { Router } from 'express'

import {
  getAll,
  getAllWithTopic,
  getById,
  deleteById,
  postCategory,
  postCategoryWithTopic
} from '../controllers/category.controller'

const router = Router()

router.get('/category/topic', getAllWithTopic)
router.get('/category/:id', getById)
router.get('/category', getAll)
// router.put('/category/:id', put)
router.post('/category/topic', postCategoryWithTopic)
router.post('/category', postCategory)
router.delete('/category/:id', deleteById)

export default router

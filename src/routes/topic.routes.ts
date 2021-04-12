import { Router } from 'express'

import {
  getAll,
  getById,
  post,
  postWithCommand,
  put,
  removeById
} from '../controllers/topic.controller'

const router = Router()

router.get('/topic/:id', getById)
router.get('/topic', getAll)
router.put('/topic/:id', put)
router.post('/topic/command', postWithCommand)
router.post('/topic', post)
router.delete('/topic/:id', removeById)

export default router

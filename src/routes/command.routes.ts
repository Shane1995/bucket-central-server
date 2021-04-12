import express from 'express'

import {
  post,
  put,
  getAll,
  getById,
  removeById
} from '../controllers/commands.controller'

const router = express.Router()

router.get('/command/:id', getById)
router.get('/command', getAll)
router.post('/command', post)
router.put('/command/:id', put)
router.delete('/command/:id', removeById)

export default router

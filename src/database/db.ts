import { PrismaClient } from '@prisma/client'

export default new PrismaClient({
  errorFormat: 'pretty',
  log: ['query', 'info', 'warn']
})

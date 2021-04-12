import { Request, Response, NextFunction } from 'express'

function logger(req: Request, res: Response, next: NextFunction) {
  const start = new Date().getTime()

  res.on('close', () => {
    const elapsedTime = new Date().getTime() - start
    console.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedTime}ms`)
  })
  next()
}

export { logger }

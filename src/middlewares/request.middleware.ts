import { Response, Request, NextFunction } from 'express'

function requestMiddleware(req: Request, resp: Response, next: NextFunction) {
  if (req.headers['x-no-compression']) {
    return resp.json({ header: 'Compression header missing' })
  }
  next()
}

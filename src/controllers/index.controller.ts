import { Request, Response, NextFunction } from 'express'

export function indexController(req: Request, resp: Response) {
  resp.send('<h1>Bucket Central</h1>')
}

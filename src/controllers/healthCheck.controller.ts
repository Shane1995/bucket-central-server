import { Request, Response } from 'express'

function healthCheck(req: Request, resp: Response) {
  return resp.status(200).json({
    status: 'ok',
    version: '1.0.0'
  })
}

export { healthCheck }

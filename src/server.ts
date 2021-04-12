import http from 'http'
import { app } from './app'

const server = http.createServer(app)

const PORT = process.env.PORT ?? 8080

server
  .listen(PORT, async () => {
    console.info(`Listening on http://localhost:${PORT}`)
  })
  .on('error', (err: Error) => {
    console.error(err)
  })

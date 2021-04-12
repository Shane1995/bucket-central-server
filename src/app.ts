import express from 'express'

// Middleware imports
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import errorMiddleware from './middlewares/error.middleware'

// Routes imports
import indexRouter from './routes/index.routes'
import commandsRouter from './routes/command.routes'
import topicRouter from './routes/topic.routes'
import categoryRouter from './routes/category.routes'
import healthCheckRouter from './routes/healthCheck.routes'

// init Express App
const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))

// Routes
app.use(commandsRouter)
app.use(topicRouter)
app.use(categoryRouter)
app.use(healthCheckRouter)
app.use(indexRouter)

// error handling
app.use(errorMiddleware)

export { app }

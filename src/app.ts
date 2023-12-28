import express, { Application, Request, Response } from 'express'
export const app: Application = express()
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './middlewares/globalErrorHandler'
import { notFound } from './middlewares/notFound'

app.use(express.json())
app.use(cors())

app.use('/api/', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.use(notFound)

app.use(globalErrorHandler)

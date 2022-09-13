import 'reflect-metadata'
import serverless from 'serverless-http'
import express, { NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import { connection } from './database/typeorm'

import './container'
import handleErrors from './middleware/handleErrors'
import { routes } from './routes'

const app = express()

app.use(cors({}))
app.use(express.json())

// Como o tempo de execução do serverless é curto, é necessario esperar a inicialização
// da conexão com o banco de dados, caso o contrario dará erro
app.use(async (_req, res, next: NextFunction) => {
  if (!connection.isInitialized) await connection.initialize()

  res.on('finish', async () => await connection.destroy())

  next()
})

app.use(routes)

app.use(handleErrors)

export { app }

module.exports.handler = serverless(app)

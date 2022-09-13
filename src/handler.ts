import 'reflect-metadata'
import serverless from "serverless-http";
import express, { NextFunction } from "express";
import cors from 'cors';

import { connection } from './database/typeorm'

import './container';
import handleErrors from "./middleware/handleErrors";
import { routes } from "./routes";

const app = express();

app.use(cors({}));
app.use(express.json());


// Como o tempo de execução do serverless é curto, é necessario esperar a initialização
// da conexão com o banco de dados, caso o contrario dará erro
app.use(async (_req, _res, next: NextFunction) => {
  if (connection.isInitialized === false)
    await connection.initialize(); 
  
  next();
});

app.use(routes);

app.use(handleErrors);


module.exports.handler = serverless(app);
import { Request, Response, Router } from 'express'
import CreateEmployeeController from '../modules/employee/controllers/CreateEmployeeController'
import ListEmployeeController from '../modules/employee/controllers/ListEmployeeController'

const routes = Router()

routes.post('/', (req: Request, res: Response) => CreateEmployeeController.handle(req, res))
routes.get('/', (req: Request, res: Response) => ListEmployeeController.handle(req, res))

export default routes

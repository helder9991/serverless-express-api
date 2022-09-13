import { Request, Response, Router } from 'express'
import CreateEmployeeController from '../modules/employee/controllers/CreateEmployeeController'
import ListEmployeeController from '../modules/employee/controllers/ListEmployeeController'
import ShowEmployeeController from '../modules/employee/controllers/ShowEmployeeController'

const routes = Router()

routes.post('/', (req: Request, res: Response) => CreateEmployeeController.handle(req, res))
routes.get('/', (req: Request, res: Response) => ListEmployeeController.handle(req, res))
routes.get('/:id', (req: Request, res: Response) => ShowEmployeeController.handle(req, res))

export default routes

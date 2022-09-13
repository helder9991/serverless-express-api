import { Request, Response, Router } from "express";
import CreateEmployeeController from "../modules/employee/controllers/CreateEmployeeController";

const routes = Router();

routes.post('/', (req: Request, res: Response) => CreateEmployeeController.handle(req, res))

export default routes;
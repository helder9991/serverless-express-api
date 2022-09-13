import { Router } from "express";

import employeeRoutes from "./employee.routes";

const routes = Router();

routes.use('/employee', employeeRoutes)

export { routes }
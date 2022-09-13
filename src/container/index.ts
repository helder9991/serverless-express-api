import { container } from 'tsyringe'
import { IEmployeeRepository } from '../modules/employee/repositories/interfaces/IEmployeeRepository'
import { EmployeeRepository } from '../modules/employee/repositories/typeorm/EmployeeRepository'

container.registerSingleton<IEmployeeRepository>('EmployeeRepository', EmployeeRepository)

import { container } from 'tsyringe'
import { IEmployeeRepository } from '../modules/employee/repositories/interfaces/IEmployeeRepository'
import { EmployeeRepository } from '../modules/employee/repositories/typeorm/EmployeeRepository'
import { FakeEmployeeRepository } from '../modules/employee/repositories/fake/FakeEmployeeRepository'

container.registerSingleton<IEmployeeRepository>('EmployeeRepository',
  process.env.NODE_ENV === 'test' ? FakeEmployeeRepository : EmployeeRepository)

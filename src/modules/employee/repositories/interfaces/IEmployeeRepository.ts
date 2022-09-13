/* eslint-disable no-unused-vars */
import { ICreateEmployeeDTO } from '../../dtos/ICreateEmployeeDTO'
import { Employee } from '../../entities/Employee'

interface IEmployeeRepository {
  create: (data: ICreateEmployeeDTO) => Promise<Employee>
  list: () => Promise<Employee[]>
  show: (id: string) => Promise<Employee | undefined | null>
}

export { IEmployeeRepository }

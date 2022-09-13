/* eslint-disable no-unused-vars */
import { ICreateEmployeeDTO } from '../../dtos/ICreateEmployeeDTO'
import { IUpdateEmployeeDTO } from '../../dtos/IUpdateEmployeeDTO'
import { Employee } from '../../entities/Employee'

interface IEmployeeRepository {
  create: (data: ICreateEmployeeDTO) => Promise<Employee>
  list: () => Promise<Employee[]>
  show: (id: string) => Promise<Employee | undefined | null>
  update: (data: IUpdateEmployeeDTO) => Promise<Employee>
}

export { IEmployeeRepository }

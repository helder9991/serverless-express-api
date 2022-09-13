import { v4 } from 'uuid'

import { ICreateEmployeeDTO } from '../../dtos/ICreateEmployeeDTO'
import { IUpdateEmployeeDTO } from '../../dtos/IUpdateEmployeeDTO'
import { Employee } from '../../entities/Employee'
import { IEmployeeRepository } from '../interfaces/IEmployeeRepository'

class FakeEmployeeRepository implements IEmployeeRepository {
  repository: Employee[]

  constructor() {
    this.repository = []
  }

  async create({ nome, idade, cargo }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = new Employee()
    Object.assign(employee, {
      id: v4(),
      nome,
      idade,
      cargo
    })

    this.repository.push(employee)

    return employee
  }

  async list(): Promise<Employee[]> {
    return this.repository
  }

  async show(id: string): Promise<Employee | undefined | null> {
    const employee = this.repository.find((employee) => employee.id === id)

    return employee
  }

  async update({ id, nome, idade, cargo }: IUpdateEmployeeDTO): Promise<Employee> {
    const employee = new Employee()

    Object.assign(employee, {
      id,
      nome,
      idade,
      cargo
    })

    this.repository = this.repository.map((item) => item.id === employee.id ? employee : item)

    return employee
  }
}

export { FakeEmployeeRepository }

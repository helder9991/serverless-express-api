import { Repository } from 'typeorm'
import { v4 } from 'uuid'

import { connection } from '../../../../database/typeorm'
import { ICreateEmployeeDTO } from '../../dtos/ICreateEmployeeDTO'
import { IUpdateEmployeeDTO } from '../../dtos/IUpdateEmployeeDTO'
import { Employee } from '../../entities/Employee'
import { IEmployeeRepository } from '../interfaces/IEmployeeRepository'

class EmployeeRepository implements IEmployeeRepository {
  repository: Repository<Employee>

  constructor() {
    this.repository = connection.getRepository(Employee)
  }

  async create({ nome, idade, cargo }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.repository.create({
      id: v4(),
      nome,
      idade,
      cargo
    })

    await this.repository.save(employee)

    return employee
  }

  async list(): Promise<Employee[]> {
    const employees = await this.repository.find()

    return employees
  }

  async show(id: string): Promise<Employee | undefined | null> {
    const employee = await this.repository.findOneBy({ id })

    return employee
  }

  async update({ id, nome, idade, cargo }: IUpdateEmployeeDTO): Promise<Employee> {
    const employee = await this.repository.save({
      id,
      nome,
      idade,
      cargo
    })

    return employee
  }

  async delete(id: string): Promise<Boolean> {
    const employee = await this.repository.delete(id)

    const deleted = employee.affected > 0

    return deleted
  }
}

export { EmployeeRepository }

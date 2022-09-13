import { inject, injectable } from 'tsyringe'
import { Employee } from '../../entities/Employee'
import { IEmployeeRepository } from '../../repositories/interfaces/IEmployeeRepository'

interface ICreateEmployeeParams {
  nome: string
  idade: number
  cargo: string
}

@injectable()
class CreateEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private readonly EmployeeRepository: IEmployeeRepository
  ) { }

  async execute({ nome, idade, cargo }: ICreateEmployeeParams): Promise<Employee> {
    const employee = await this.EmployeeRepository.create({ nome, idade, cargo })

    return employee
  }
}

export { CreateEmployeeUseCase }

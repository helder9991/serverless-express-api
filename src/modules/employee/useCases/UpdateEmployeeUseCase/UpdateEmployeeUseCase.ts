import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../util/AppError'
import { Employee } from '../../entities/Employee'
import { IEmployeeRepository } from '../../repositories/interfaces/IEmployeeRepository'

interface IUpdateEmployeeParams {
  id: string
  nome: string
  idade: number
  cargo: string
}

@injectable()
class UpdateEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private readonly EmployeeRepository: IEmployeeRepository
  ) { }

  async execute({ id, nome, idade, cargo }: IUpdateEmployeeParams): Promise<Employee> {
    const employeeExist = await this.EmployeeRepository.show(id)

    if (employeeExist === null || employeeExist === undefined) throw new AppError('Employee does not exist', 400)

    const employee = await this.EmployeeRepository.update({ id, nome, idade, cargo })

    return employee
  }
}

export { UpdateEmployeeUseCase }

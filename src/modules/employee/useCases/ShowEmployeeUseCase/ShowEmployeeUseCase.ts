import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../util/AppError'
import { Employee } from '../../entities/Employee'
import { IEmployeeRepository } from '../../repositories/interfaces/IEmployeeRepository'

@injectable()
class ShowEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private readonly EmployeeRepository: IEmployeeRepository
  ) { }

  async execute(id: string): Promise<Employee> {
    const employee = await this.EmployeeRepository.show(id)

    if (employee === null || employee === undefined) throw new AppError('Employee does not exist', 400)

    return employee
  }
}

export { ShowEmployeeUseCase }

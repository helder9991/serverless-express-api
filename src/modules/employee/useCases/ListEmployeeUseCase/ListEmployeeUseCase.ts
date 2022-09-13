import { inject, injectable } from 'tsyringe'
import { Employee } from '../../entities/Employee'
import { IEmployeeRepository } from '../../repositories/interfaces/IEmployeeRepository'

@injectable()
class ListEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private readonly EmployeeRepository: IEmployeeRepository
  ) { }

  async execute(): Promise<Employee[]> {
    const employees = await this.EmployeeRepository.list()

    return employees
  }
}

export { ListEmployeeUseCase }

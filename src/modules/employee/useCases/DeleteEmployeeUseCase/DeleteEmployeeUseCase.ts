import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../util/AppError'
import { IEmployeeRepository } from '../../repositories/interfaces/IEmployeeRepository'

@injectable()
class DeleteEmployeeUseCase {
  constructor(
    @inject('EmployeeRepository')
    private readonly EmployeeRepository: IEmployeeRepository
  ) { }

  async execute(id: string): Promise<Boolean> {
    const deleted = await this.EmployeeRepository.delete(id)

    if (deleted === false) throw new AppError('Employee does not exist', 400)

    return true
  }
}

export { DeleteEmployeeUseCase }

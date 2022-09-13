import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListEmployeeUseCase } from '../useCases/ListEmployeeUseCase/ListEmployeeUseCase'

class ListEmployeeController {
  async handle(_req: Request, res: Response): Promise<Response> {
    const listEmployeeUseCase: ListEmployeeUseCase = container.resolve(ListEmployeeUseCase)

    const employees = await listEmployeeUseCase.execute()

    return res.status(200).json(employees)
  }
}

export default new ListEmployeeController()

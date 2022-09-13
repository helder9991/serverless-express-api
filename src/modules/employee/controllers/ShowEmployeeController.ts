import * as Yup from 'yup'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ShowEmployeeUseCase } from '../useCases/ShowEmployeeUseCase/ShowEmployeeUseCase'
import { trimObjectValues } from '../../../util/trimObjectValues'
import { AppError } from '../../../util/AppError'

class ShowEmployeeController {
  private readonly schema: Yup.ObjectSchema<any>

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().uuid().required()
    })
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { id } = req.params;

    ({ id } = trimObjectValues({ id }))

    if (!(await this.schema.isValid({ id }))) throw new AppError('Validation Fails', 400)

    const showEmployeeUseCase: ShowEmployeeUseCase = container.resolve(ShowEmployeeUseCase)

    const employee = await showEmployeeUseCase.execute(id)

    return res.status(200).json(employee)
  }
}

export default new ShowEmployeeController()

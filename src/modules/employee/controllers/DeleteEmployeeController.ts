import * as Yup from 'yup'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteEmployeeUseCase } from '../useCases/DeleteEmployeeUseCase/DeleteEmployeeUseCase'
import { trimObjectValues } from '../../../util/trimObjectValues'
import { AppError } from '../../../util/AppError'

class DeleteEmployeeController {
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

    const deleteEmployeeUseCase: DeleteEmployeeUseCase = container.resolve(DeleteEmployeeUseCase)

    await deleteEmployeeUseCase.execute(id)

    return res.status(204).send()
  }
}

export default new DeleteEmployeeController()

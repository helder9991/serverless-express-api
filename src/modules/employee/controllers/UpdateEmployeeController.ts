import * as Yup from 'yup'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateEmployeeUseCase } from '../useCases/UpdateEmployeeUseCase/UpdateEmployeeUseCase'
import { trimObjectValues } from '../../../util/trimObjectValues'
import { AppError } from '../../../util/AppError'

class UpdateEmployeeController {
  private readonly schema: Yup.ObjectSchema<any>

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().uuid().required(),
      nome: Yup.string().required(),
      idade: Yup.number().positive().required(),
      cargo: Yup.string().required()
    })
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { id } = req.params
    let { nome, idade, cargo } = req.body;

    ({ id, nome, idade, cargo } = trimObjectValues({ id, nome, idade, cargo }))

    if (!(await this.schema.isValid({ id, nome, idade, cargo }))) throw new AppError('Validation Fails', 400)

    const updateEmployeeUseCase: UpdateEmployeeUseCase = container.resolve(UpdateEmployeeUseCase)

    const employee = await updateEmployeeUseCase.execute({ id, nome, idade, cargo })

    return res.status(200).json(employee)
  }
}

export default new UpdateEmployeeController()

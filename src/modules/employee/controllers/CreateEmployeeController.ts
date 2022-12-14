import * as Yup from 'yup'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AppError } from '../../../util/AppError'
import { CreateEmployeeUseCase } from '../useCases/CreateEmployee/CreateEmployeeUseCase'
import { trimObjectValues } from '../../../util/trimObjectValues'

class CreateEmployeeController {
  private readonly schema: Yup.ObjectSchema<any>

  constructor() {
    this.schema = Yup.object().shape({
      nome: Yup.string().strict().required(),
      idade: Yup.number().strict().positive().required(),
      cargo: Yup.string().strict().required()
    })
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { nome, idade, cargo } = req.body;

    ({ nome, idade, cargo } = trimObjectValues({ nome, idade, cargo }))

    if (!(await this.schema.isValid({ nome, idade, cargo }))) throw new AppError('Validation Fails', 400)

    const createEmployeeUseCase: CreateEmployeeUseCase = container.resolve(CreateEmployeeUseCase)

    const { id } = await createEmployeeUseCase.execute({ nome, idade, cargo })

    return res.status(201).json({ id, nome, idade, cargo })
  }
}

export default new CreateEmployeeController()

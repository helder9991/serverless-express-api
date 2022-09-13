import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { CreateEmployeeUseCase } from '../useCases/CreateEmployee/CreateEmployeeUseCase';
import { trimObjectValues } from '../../../util/trimObjectValues';

class CreateUserController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      nome: Yup.string().required(),
      idade: Yup.number().positive().required(),
      cargo: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { nome, idade, cargo } = req.body;

    ({ nome, idade, cargo } = trimObjectValues({ nome, idade, cargo }));

    if (!(await this.schema.isValid({ nome, idade, cargo }))) throw new AppError('Validation Fails', 400);

    const createUserUseCase: CreateEmployeeUseCase = container.resolve(CreateEmployeeUseCase);
    
    let { id } = await createUserUseCase.execute({ nome, idade, cargo });

    return res.status(201).json({ id, nome, idade, cargo });
  }
}

export default new CreateUserController();

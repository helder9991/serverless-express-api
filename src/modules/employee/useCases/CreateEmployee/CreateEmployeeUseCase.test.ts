import 'reflect-metadata'
import { FakeEmployeeRepository } from '../../repositories/fake/FakeEmployeeRepository'
import { CreateEmployeeUseCase } from './CreateEmployeeUseCase'

let fakeEmployeeRepository: FakeEmployeeRepository
let createEmployee: CreateEmployeeUseCase

describe('CreateEmployee', () => {
  beforeEach(() => {
    fakeEmployeeRepository = new FakeEmployeeRepository()
    createEmployee = new CreateEmployeeUseCase(fakeEmployeeRepository)
  })

  it('Should be able to create a new Employee', async () => {
    const employee = await createEmployee.execute({
      nome: 'John',
      idade: 22,
      cargo: 'TI'
    })

    expect(employee).toMatchObject({
      nome: 'John',
      idade: 22,
      cargo: 'TI'
    })
  })
})

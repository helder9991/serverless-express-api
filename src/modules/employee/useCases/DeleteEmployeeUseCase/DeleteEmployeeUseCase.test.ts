import 'reflect-metadata'
import { FakeEmployeeRepository } from '../../repositories/fake/FakeEmployeeRepository'
import { CreateEmployeeUseCase } from '../CreateEmployee/CreateEmployeeUseCase'
import { Employee } from '../../entities/Employee'
import { DeleteEmployeeUseCase } from './DeleteEmployeeUseCase'

let fakeEmployeeRepository: FakeEmployeeRepository
let deleteEmployee: DeleteEmployeeUseCase
let createEmployee: CreateEmployeeUseCase

let employee: Employee

describe('DeleteEmployee', () => {
  beforeEach(async () => {
    fakeEmployeeRepository = new FakeEmployeeRepository()
    deleteEmployee = new DeleteEmployeeUseCase(fakeEmployeeRepository)
    createEmployee = new CreateEmployeeUseCase(fakeEmployeeRepository)

    employee = await createEmployee.execute({
      nome: 'John',
      idade: 22,
      cargo: 'TI'
    })
  })

  it('Should be able to delete a employee', async () => {
    const deleted = await deleteEmployee.execute(employee.id)
    expect(deleted).toBeTruthy()
  })

  it('Should not be able to delete a non-existing employee', async () => {
    expect(deleteEmployee.execute('non-existing-id'))
      .rejects.toHaveProperty('message', 'Employee does not exist')
  })
})

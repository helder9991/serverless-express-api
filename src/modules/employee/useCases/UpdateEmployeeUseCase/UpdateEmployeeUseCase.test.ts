import 'reflect-metadata'
import { FakeEmployeeRepository } from '../../repositories/fake/FakeEmployeeRepository'
import { CreateEmployeeUseCase } from '../CreateEmployee/CreateEmployeeUseCase'
import { Employee } from '../../entities/Employee'
import { UpdateEmployeeUseCase } from './UpdateEmployeeUseCase'

let fakeEmployeeRepository: FakeEmployeeRepository
let updateEmployee: UpdateEmployeeUseCase
let createEmployee: CreateEmployeeUseCase

let employee: Employee

describe('ShowEmployee', () => {
  beforeEach(async () => {
    fakeEmployeeRepository = new FakeEmployeeRepository()
    updateEmployee = new UpdateEmployeeUseCase(fakeEmployeeRepository)
    createEmployee = new CreateEmployeeUseCase(fakeEmployeeRepository)

    employee = await createEmployee.execute({
      nome: 'John',
      idade: 22,
      cargo: 'TI'
    })
  })

  it('Should be able to update a employee', async () => {
    const updatedEmployee = await updateEmployee.execute({
      id: employee.id,
      nome: 'John 2',
      idade: 40,
      cargo: 'BI'
    })
    expect(updatedEmployee).toMatchObject({
      nome: 'John 2',
      idade: 40,
      cargo: 'BI'
    })
  })

  it('Should not be able to update a non-existing employee', async () => {
    expect(updateEmployee.execute({
      id: 'non-existing-id',
      nome: 'John 2',
      idade: 40,
      cargo: 'BI'
    }))
      .rejects.toHaveProperty('message', 'Employee does not exist')
  })
})

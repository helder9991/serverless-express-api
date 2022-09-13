import 'reflect-metadata'
import { FakeEmployeeRepository } from '../../repositories/fake/FakeEmployeeRepository'
import { ShowEmployeeUseCase } from './ShowEmployeeUseCase'
import { CreateEmployeeUseCase } from '../CreateEmployee/CreateEmployeeUseCase'
import { Employee } from '../../entities/Employee'

let fakeEmployeeRepository: FakeEmployeeRepository
let showEmployee: ShowEmployeeUseCase
let createEmployee: CreateEmployeeUseCase

let employee1: Employee, employee2: Employee

describe('ShowEmployee', () => {
  beforeEach(async () => {
    fakeEmployeeRepository = new FakeEmployeeRepository()
    showEmployee = new ShowEmployeeUseCase(fakeEmployeeRepository)
    createEmployee = new CreateEmployeeUseCase(fakeEmployeeRepository)

    employee1 = await createEmployee.execute({
      nome: 'John',
      idade: 22,
      cargo: 'TI'
    })

    employee2 = await createEmployee.execute({
      nome: 'Marie',
      idade: 28,
      cargo: 'TI'
    })
  })

  it('Should be able to show a employee', async () => {
    let employee = await showEmployee.execute(employee1.id)
    expect(employee).toEqual(employee1)

    employee = await showEmployee.execute(employee2.id)
    expect(employee).toEqual(employee2)
  })

  it('Should not be able to show a non-existing employee', async () => {
    expect(showEmployee.execute('non-existing'))
      .rejects.toHaveProperty('message', 'Employee does not exist')
  })
})

import 'reflect-metadata'
import { FakeEmployeeRepository } from '../../repositories/fake/FakeEmployeeRepository'
import { ListEmployeeUseCase } from './ListEmployeeUseCase'
import { CreateEmployeeUseCase } from '../CreateEmployee/CreateEmployeeUseCase'
import { Employee } from '../../entities/Employee'

let fakeEmployeeRepository: FakeEmployeeRepository
let listEmployee: ListEmployeeUseCase
let createEmployee: CreateEmployeeUseCase

let employee1: Employee, employee2: Employee

describe('ListEmployee', () => {
  beforeEach(async () => {
    fakeEmployeeRepository = new FakeEmployeeRepository()
    listEmployee = new ListEmployeeUseCase(fakeEmployeeRepository)
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

  it('Should be able to List a new Employee', async () => {
    const employees = await listEmployee.execute()

    expect(employees).toEqual([employee1, employee2])
  })
})

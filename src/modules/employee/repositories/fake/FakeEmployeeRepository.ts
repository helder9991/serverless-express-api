import { v4 } from "uuid";

import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO"
import { Employee } from "../../entities/Employee";
import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";

class FakeEmployeeRepository implements IEmployeeRepository {
  repository: Employee[];

  constructor() {
    this.repository = [];
  }

  async create({ nome, idade, cargo }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = new Employee();
    Object.assign(employee, {
      id: v4(),
      nome,
      idade,
      cargo
    })

    this.repository.push(employee);
    
    return employee;
  }

}

export { FakeEmployeeRepository }
/* eslint-disable no-unused-vars */
import { ICreateEmployeeDTO } from '../../dtos/ICreateEmployeeDTO';
import { Employee } from '../../entities/Employee';

interface IEmployeeRepository {
  create(data: ICreateEmployeeDTO): Promise<Employee>;
}

export { IEmployeeRepository };

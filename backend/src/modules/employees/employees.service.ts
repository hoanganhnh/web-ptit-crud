import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepository.save(createEmployeeDto);
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOneById(id: number) {
    return await this.employeeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.preload({
      id,
      ...updateEmployeeDto,
    });
    return await this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOneById(id);
    return await this.employeeRepository.remove(employee);
  }
}

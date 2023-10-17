import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { ICustomerService } from './customer.interface';
import { CustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService implements ICustomerService {
	constructor(
		@InjectRepository(CustomerEntity)
		private customerRepository: Repository<CustomerEntity>,
	) { }

	async getAll(): Promise<CustomerEntity[]> {
		const allCustomers = await this.customerRepository.find()
		return allCustomers;
	}

	async getByCpf(cpf: string): Promise<CustomerEntity> {
		const selectedCustomer = await this.customerRepository.findOne({
			where: { cpf },
			relations: { vehicle: true }
		})
		return selectedCustomer;
	}

	async getByCpfOrError(cpf: string): Promise<CustomerEntity> {
		const selectedCustomer = await this.getByCpf(cpf);
		if (selectedCustomer === null) throw new Error(`Cliente com cpf ${cpf} não encontrado.`)
		return selectedCustomer;
	}

	async getById(id: string): Promise<CustomerEntity> {
		const selectedCustomer = await this.customerRepository.findOne({
			where: { id },
			relations: { vehicle: true }
		})
		return selectedCustomer;
	}

	async getByIdOrError(id: string): Promise<CustomerEntity> {
		const selectedCustomer = await this.getById(id)
		if (selectedCustomer == null) throw new Error(`Cliente com id ${id} não encontrado.`)
		return selectedCustomer;
	}

	async create(customer: CustomerDto): Promise<CustomerEntity> {
		const customerEntity = new CustomerEntity({
			cellphone: customer.cellphone,
			cpf: customer.cpf,
			first_name: customer.first_name,
			last_name: customer.last_name,
			vehicle: customer.vehicle
		})
		// await this.customerRepository.insert(customerEntity)
		const createdCustomer = await this.customerRepository.save(customerEntity)
		return createdCustomer
	}
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(CustomerEntity)
		private customerRepository: Repository<CustomerEntity>,
	) { }


	async create(customer: CustomerEntity) {
		return await this.customerRepository.insert(customer)
	}
}

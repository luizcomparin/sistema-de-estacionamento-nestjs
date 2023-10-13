import { CustomerDto } from "../dto/customer.dto";
import { CustomerEntity } from "../entity/customer.entity";

export const CUSTOMER_SERVICE = "CUSTOMER SERVICE"

export interface ICustomerService {
	getAll(): Promise<CustomerEntity[]>

	getByCpf(cpf: string): Promise<CustomerEntity>

	getById(id: string): Promise<CustomerEntity>

	create(customer: CustomerDto): Promise<CustomerEntity>
}

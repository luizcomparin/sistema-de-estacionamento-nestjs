import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { CustomerEntity } from '../../entity/customer.entity';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { CUSTOMER_SERVICE, ICustomerService } from '../../service/customer.interface';

@Controller('customer')
export class CustomerController {

	constructor(
		@Inject(CUSTOMER_SERVICE)
		private customerService: ICustomerService
	) { }

	@Post('/create')
	@HttpCode(HttpStatus.FOUND)
	async create(@Body() customer: CustomerEntity) {
		const customerCreateResponse = await this.customerService.create(customer);
		return new CommonResponse<CustomerEntity[]>(StatusEnum.success, "Listando todos os check-ins.", customerCreateResponse)
		// throw new HttpException(new CommonResponse<CustomerEntity[]>(StatusEnum.success, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
	}
}

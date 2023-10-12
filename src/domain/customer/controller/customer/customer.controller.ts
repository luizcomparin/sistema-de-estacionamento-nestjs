import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CustomerEntity } from '../../entity/customer.entity';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { CustomerService } from '../../service/customer.service';

@Controller('customer')
export class CustomerController {

	constructor(private readonly customerService: CustomerService) { }


	@Post('/create')
	@HttpCode(HttpStatus.FOUND)
	async create(@Body() customer: CustomerEntity) {

		const customerCreateResponse = await this.customerService.create(customer);

		return new CommonResponse<CustomerEntity[]>(StatusEnum.success, "Listando todos os check-ins.", customerCreateResponse)

		// throw new HttpException(new CommonResponse<CustomerEntity[]>(StatusEnum.success, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
	}
}

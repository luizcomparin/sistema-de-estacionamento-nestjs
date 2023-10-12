import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { VehicleEntity } from '../../entity/vehicle.entity';
import { VehicleService } from '../../service/vehicle.service';
import { CheckInEntity } from 'src/domain/check-in/entity/check-in.entity';

@Controller('vehicle')
export class VehicleController {

	constructor(private readonly vehicleService: VehicleService) { }

	@Get('/get-all')
	@HttpCode(HttpStatus.FOUND)
	async getAll() {

		var checkInGetAllResponse = await this.vehicleService.getAll();

		return new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", checkInGetAllResponse)

		// throw new HttpException(new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
	}

	@Post('/create')
	@HttpCode(HttpStatus.FOUND)
	async create(@Body() vehicle: VehicleEntity) {

		const vehicleCreateResponse = await this.vehicleService.create(vehicle);

		return new CommonResponse<VehicleEntity[]>(StatusEnum.success, "Listando todos os check-ins.", vehicleCreateResponse)

		// throw new HttpException(new CommonResponse<VehicleEntity[]>(StatusEnum.success, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
	}
}

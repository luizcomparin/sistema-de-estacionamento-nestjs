import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { VehicleEntity } from '../../entity/vehicle.entity';
import { CheckInEntity } from 'src/domain/check-in/entity/check-in.entity';
import { IVehicleService, VEHICLE_SERVICE } from '../../service/vehicle.interface';

@Controller('vehicle')
export class VehicleController {

	constructor(
		@Inject(VEHICLE_SERVICE)
		private vehicleService: IVehicleService
	) { }

	@Get('/get-all')
	@HttpCode(HttpStatus.FOUND)
	async getAll() {
		var checkInGetAllResponse = await this.vehicleService.getAll();
		return new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", checkInGetAllResponse)
	}

	@Post('/create')
	@HttpCode(HttpStatus.FOUND)
	async create(@Body() vehicle: VehicleEntity) {
		const vehicleCreateResponse = await this.vehicleService.create(vehicle);
		return new CommonResponse<VehicleEntity[]>(StatusEnum.success, "Listando todos os check-ins.", vehicleCreateResponse)
	}
}

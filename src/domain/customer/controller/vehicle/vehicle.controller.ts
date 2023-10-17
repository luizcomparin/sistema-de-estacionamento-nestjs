import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { VehicleEntity } from '../../entity/vehicle.entity';
import { EntryEntity } from 'src/domain/entry/entity/entry.entity';
import { IVehicleService, VEHICLE_SERVICE } from '../../service/vehicle.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('vehicle')
@ApiTags('Vehicle')
export class VehicleController {

	constructor(
		@Inject(VEHICLE_SERVICE)
		private vehicleService: IVehicleService
	) { }

	@Get('/get-all')
	@HttpCode(HttpStatus.FOUND)
	async getAll() {
		var entryGetAllResponse = await this.vehicleService.getAll();
		return new CommonResponse<EntryEntity[]>(StatusEnum.success, "Listando todos os check-ins.", entryGetAllResponse)
	}

	@Post('/create')
	@HttpCode(HttpStatus.FOUND)
	async create(@Body() vehicle: VehicleEntity) {
		const vehicleCreateResponse = await this.vehicleService.create(vehicle);
		return new CommonResponse<VehicleEntity[]>(StatusEnum.success, "Listando todos os check-ins.", vehicleCreateResponse)
	}
}

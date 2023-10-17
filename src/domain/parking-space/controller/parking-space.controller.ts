import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { PARKING_SPACE_SERVICE } from '../service/parking-space.interface';
import { ParkingSpaceEntity } from '../entity/parking-space.entity';
import { ParkingSpaceWithoutCustomerDto } from '../dto/parking-space.dto';
import { ParkingSpaceService } from '../service/parking-space.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('parking-space')
@ApiTags('Parking Space')
export class ParkingSpaceController {

	constructor(
		@Inject(PARKING_SPACE_SERVICE)
		private readonly parkingSpaceService: ParkingSpaceService
	) { }

	@Get('/get-all')
	@HttpCode(HttpStatus.FOUND)
	@ApiResponse({ status: HttpStatus.OK, type: CommonResponse })
	@ApiResponse({ status: HttpStatus.FOUND, type: ParkingSpaceEntity })
	async getAll() {
		var parkingSpaceGetAllResponse = await this.parkingSpaceService.getAll();
		return new CommonResponse<ParkingSpaceEntity[]>(StatusEnum.success, "Listando todos os espaços de estacionamento.", parkingSpaceGetAllResponse)
		// throw new HttpException(new CommonResponse<ParkingSpaceEntity[]>(StatusEnum.success, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
	}

	@Get("/get-by-id/:id")
	@HttpCode(HttpStatus.FOUND)
	async getById(@Param('id') id: string) {
		try {
			const getByIdResponse: ParkingSpaceEntity = await this.parkingSpaceService.getById(id);
			return new CommonResponse<ParkingSpaceEntity>(StatusEnum.success, "Vaga encontrada.", getByIdResponse)
		}
		catch (error) {
			// if (error.Message == CommonResponseResultEnum.NOT_FOUND.ToString())
			// 	throw new HttpException(new CommonResponse<ParkingSpaceEntity>(StatusEnum.failure, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
			throw new HttpException(new CommonResponse<ParkingSpaceEntity>(StatusEnum.failure, error?.message, null), HttpStatus.NOT_FOUND)
		}
	}

	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() parkingSpaceDto: ParkingSpaceWithoutCustomerDto) {
		try {
			const parkingSpaceCreateResponse = await this.parkingSpaceService.create(parkingSpaceDto)
			return new CommonResponse<ParkingSpaceEntity>(StatusEnum.success, "Espaço de estacionamento criado com sucesso.", parkingSpaceCreateResponse)
		}
		catch (error) {
			// if (error.Message == CommonResponseResultEnum.NOT_FOUND.ToString())
			// 	return NotFound(new CommonResponse<ParkingSpaceEntity>(StatusEnum.failure, error.InnerException?.Message, null));
			throw new HttpException(new CommonResponse<ParkingSpaceEntity>(StatusEnum.failure, error?.message, null), HttpStatus.CONFLICT)
		}
	}

	@Put("/edit/:id")
	@HttpCode(HttpStatus.OK)
	async edit(@Param('id') id: string, @Body() parkingSpaceDto: ParkingSpaceWithoutCustomerDto) {
		try {
			const parkingSpaceEditResponse = await this.parkingSpaceService.edit(id, parkingSpaceDto);
			return new CommonResponse<ParkingSpaceEntity>(StatusEnum.success, "Espaço de estacionamento editado com sucesso.", parkingSpaceEditResponse)
		}
		catch (error) {
			//if (error.Message == CommonResponseResultEnum.NOT_FOUND.ToString())
			//	return NotFound(new CommonResponse<ParkingSpaceEntity>(StatusEnum.failure, error.InnerException?.Message, null));
			throw new HttpException(new CommonResponse<ParkingSpaceEntity>(StatusEnum.failure, error?.message, null), HttpStatus.CONFLICT)

			// return new ErrorResponse(error);
		}
	}

	@Patch("/occupy/:parkingSpaceId")
	@HttpCode(HttpStatus.OK)
	async occupy(@Param('parkingSpaceId') parkingSpaceId: string, @Body('customerId') customerId: string) {
		try {
			const occupyResponse = await this.parkingSpaceService.occupy(parkingSpaceId, customerId);

			return new CommonResponse<ParkingSpaceEntity>(StatusEnum.success, "Espaço de estacionamento ocupado com sucesso.", occupyResponse)
		}
		catch (error) {
			throw new HttpException(new CommonResponse<ParkingSpaceEntity>(StatusEnum.failure, error?.message, null), HttpStatus.CONFLICT)
		}
	}

	@Patch("/liberate/:id")
	async liberate(@Param('id') id: string) {
		try {
			const liberateResponse = await this.parkingSpaceService.liberate(id);

			return new CommonResponse<ParkingSpaceEntity>(StatusEnum.success, "Espaço de estacionamento liberado com sucesso.", liberateResponse)
		}
		catch (error) {
			throw new HttpException(new CommonResponse<ParkingSpaceEntity>(StatusEnum.failure, error?.message, null), HttpStatus.CONFLICT)
		}
	}
}

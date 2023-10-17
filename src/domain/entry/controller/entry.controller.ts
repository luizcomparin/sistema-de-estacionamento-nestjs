import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { EntryEntity } from '../entity/entry.entity';
import { ENTRY_SERVICE, IEntryService } from '../service/entry.service.interface';
import { CustomerDto } from 'src/domain/customer/dto/customer.dto';
import { IParkingSpaceService, PARKING_SPACE_SERVICE } from 'src/domain/parking-space/service/parking-space.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('entry')
@ApiTags('Entry')
export class EntryController {
	constructor(
		@Inject(ENTRY_SERVICE)
		private entryService: IEntryService,
		@Inject(PARKING_SPACE_SERVICE)
		private parkingSpaceService: IParkingSpaceService
	) { }

	@Get('/get-all')
	@HttpCode(HttpStatus.FOUND)
	async getAll() {

		const entryGetAllResponse = await this.entryService.getAll();

		return new CommonResponse<EntryEntity[]>(StatusEnum.success, "Listando todos as entradas.", entryGetAllResponse)

		// throw new HttpException(new CommonResponse<EntryEntity[]>(StatusEnum.success, "Listando todos as entradas.", null), HttpStatus.CONFLICT)
	}

	@Get('/get-by-id/:id')
	@HttpCode(HttpStatus.FOUND)
	async getById(@Param('id') id: string) {
		try {
			const getByIdResponse: EntryEntity = await this.entryService.getById(id);
			return new CommonResponse<EntryEntity>(StatusEnum.success, "Entrada encontrada.", getByIdResponse)
		}
		catch (error) {
			throw new HttpException(new CommonResponse<EntryEntity>(StatusEnum.failure, error?.message, null), HttpStatus.NOT_FOUND)
		}
	}

	@ApiBody({ type: CustomerDto })
	@Post('/checkin/:parkingSpaceId')
	@HttpCode(HttpStatus.OK)
	async checkin(@Param('parkingSpaceId') parkingSpaceId: string, @Body() customer: CustomerDto) {
		try {
			const openEntryResponse = await this.entryService.checkin(parkingSpaceId, customer)
			return new CommonResponse<EntryEntity>(StatusEnum.success, "CheckIn efetuado com sucesso.", openEntryResponse);
		}
		catch (error) {
			throw new HttpException(new CommonResponse<EntryEntity>(StatusEnum.failure, error.toString(), null), HttpStatus.NOT_FOUND)
		}
	}

	@Get("/checkout/:id")
	public async checkout(@Param('id') id: string) {
		try {
			const entryFinalizeResponse = await this.entryService.checkout(id);
			//  1.ver por que o parked_customer ta indo vazio ao finalizar entry
			await this.parkingSpaceService.liberate(entryFinalizeResponse.parking_space.id);

			return new CommonResponse<EntryEntity>(StatusEnum.success, "CheckOut efetuado com sucesso.", entryFinalizeResponse);
		}
		catch (error) {
			throw new HttpException(new CommonResponse<EntryEntity>(StatusEnum.failure, error?.message, null), HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}

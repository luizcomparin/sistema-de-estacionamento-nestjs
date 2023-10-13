import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { CheckInService } from '../service/check-in.service';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { CheckInEntity } from '../entity/check-in.entity';
import { CHECKIN_SERVICE, ICheckInService } from '../service/check-in.service.interface';
import { CustomerDto } from 'src/domain/customer/dto/customer.dto';

@Controller('check-in')
export class CheckInController {
	constructor(
		@Inject(CHECKIN_SERVICE)
		private checkInService: ICheckInService
	) { }

	@Get('/get-all')
	@HttpCode(HttpStatus.FOUND)
	async getAll() {

		const checkInGetAllResponse = await this.checkInService.getAll();

		return new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", checkInGetAllResponse)

		// throw new HttpException(new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
	}

	@Get('/get-by-id/:id')
	@HttpCode(HttpStatus.FOUND)
	async getById(@Param('id') id: string) {
		try {
			const getByIdResponse: CheckInEntity = await this.checkInService.getById(id);
			return new CommonResponse<CheckInEntity>(StatusEnum.success, "Check-in encontrado.", getByIdResponse)
		}
		catch (error) {
			throw new HttpException(new CommonResponse<CheckInEntity>(StatusEnum.failure, error?.message, null), HttpStatus.NOT_FOUND)
		}
	}

	@Post('/open/:parkingSpaceId')
	@HttpCode(HttpStatus.OK)
	async open(@Param('parkingSpaceId') parkingSpaceId: string, @Body() customer: CustomerDto) {
		try {
			const openCheckInResponse = await this.checkInService.open(parkingSpaceId, customer)
			return new CommonResponse<CheckInEntity>(StatusEnum.success, "CheckIn aberto com sucesso.", openCheckInResponse);
		}
		catch (error) {
			throw new HttpException(new CommonResponse<CheckInEntity>(StatusEnum.failure, error?.message, null), HttpStatus.NOT_FOUND)
		}
	}
	/*
		@Get("close/:id")
		public async close(int id)
		{
			try
			{
				CheckInEntity checkInFinalizeResponse = await _CIRepo.FinalizeCheckIn(id);

				//  1.ver por que o parked_customer ta indo vazio ao finalizar checkin
				await _PSRepo.Liberate(checkInFinalizeResponse.Parking_Space.Id);

				return Ok(new CommonResponse<CheckInEntity>(CommonResponseEnum.Sucesso, "CheckIn finalizado com sucesso.", checkInFinalizeResponse));
			}
			catch (Exception error)
			{
				if (error.Message == CommonResponseResultEnum.NOT_FOUND.ToString())
				{
					return NotFound(new CommonResponse<CheckInEntity>(CommonResponseEnum.Error, error.InnerException?.Message, null));
				}

				return BadRequest(new CommonResponse<CheckInEntity>(CommonResponseEnum.Error, error.InnerException?.Message, null));
			}
		}*/
}

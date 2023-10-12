import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CheckInService } from '../service/check-in.service';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { CheckInEntity } from '../entity/check-in.entity';

@Controller('check-in')
export class CheckInController {
	constructor(private readonly checkInService: CheckInService) { }

	@Get('/get-all')
	@HttpCode(HttpStatus.FOUND)
	async getAll() {

		var checkInGetAllResponse = await this.checkInService.getAll();

		return new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", checkInGetAllResponse)

		// throw new HttpException(new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
	}

	@Post('/create')
	@HttpCode(HttpStatus.FOUND)
	async create(@Body() checkIn: CheckInEntity) {

		const checkInCreateResponse = await this.checkInService.create(checkIn);

		return new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", checkInCreateResponse)

		// throw new HttpException(new CommonResponse<CheckInEntity[]>(StatusEnum.success, "Listando todos os check-ins.", null), HttpStatus.CONFLICT)
	}
	/*
		@Get("/get-by-id/:id")
		async getById(@Param() id:string)
		{
			try
			{
				const getByIdResponse:CheckInEntity = await this.checkInService.getById(id);

				return new CommonResponse<CheckInEntity>(StatusEnum.success, "Vaga encontrada.", getByIdResponse)
			}
			catch (Exception error)
			{
				if (error.Message == CommonResponseResultEnum.NOT_FOUND.ToString())
				{
					return new HttpException()
					return NotFound(new CommonResponse<CheckInEntity>(CommonResponseEnum.Error, error.InnerException?.Message, null));
				}

				return BadRequest(new CommonResponse<CheckInEntity>(CommonResponseEnum.Error, error.InnerException?.Message, null));
			}
		}


		@Post("open/:parkingSpaceId")
		public async Open(parkingSpaceId:string, @Body() customer:CustomerDto)
		{
			try
			{
			// Verificar se a vaga existe e está vazia.
				ParkingSpaceEntity? existentParkingSpace = await _PSRepo.GetById(ParkingSpaceId);

				if (existentParkingSpace == null) return NotFound(new CommonResponse<CheckInEntity>(CommonResponseEnum.Error, "Espaço de estacionamento não encontrado.", null));
				if (!existentParkingSpace.Disponible) return BadRequest(new CommonResponse<CheckInEntity>(CommonResponseEnum.Error, "Espaço de estacionamento está ocupado.", null));


			// Pegar ou criar customer.
				var existentCustomer = await _CuRepo.FindCustomerByCPF(customer.Cpf);

				if (existentCustomer == null)
				{
					await _VeRepo.CreateNewVehicle(customer.Vehicle);
					await _CuRepo.CreateNewCustomer(customer);
				}
				else
				{
					var existentVehicle = await _VeRepo.FindVehicleByPlate(customer.Vehicle.Plate);

					if (existentVehicle == null) await _VeRepo.CreateNewVehicle(customer.Vehicle);
				}

				// Criar CheckIn.
				const checkInEntity = new CheckInEntity()
				{
					Parking_Space = existentParkingSpace,
					Hour_Entered = DateTime.Now.ToUniversalTime(),
					Hour_Exited = null,
					Total_Price = null,
				};
				var openCheckInResponse = await _CIRepo.OpenCheckIn(checkInEntity);

			// Ocupar ParkingSpace.
				await _PSRepo.Occupy(existentParkingSpace.Id, customer);

				return Ok(new CommonResponse<CheckInEntity>(CommonResponseEnum.Sucesso, "CheckIn aberto com sucesso.", openCheckInResponse));
			}
			catch (Exception error)
			{
				return new ErrorResponse(error);
			}
		}

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

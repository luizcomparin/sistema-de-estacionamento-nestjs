import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckInEntity } from '../entity/check-in.entity';
import { Repository } from 'typeorm';
import { ICheckInService } from './check-in.service.interface';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { CustomerDto } from 'src/domain/customer/dto/customer.dto';
import { IParkingSpaceService, PARKING_SPACE_SERVICE } from 'src/domain/parking-space/service/parking-space.interface';
import { CUSTOMER_SERVICE, ICustomerService } from 'src/domain/customer/service/customer.interface';
import { IVehicleService, VEHICLE_SERVICE } from 'src/domain/customer/service/vehicle.interface';
import { CheckInParkingSpaceEntity } from '../entity/checkin-parkingspace.entity';
import { CheckInCustomerEntity } from '../entity/check-in-customer.entity';
import { CheckInVehicleEntity } from '../entity/check-in-vehicle.entity';
import { VehicleEntity } from 'src/domain/customer/entity/vehicle.entity';
import { CustomerEntity } from 'src/domain/customer/entity/customer.entity';

@Injectable()
export class CheckInService implements ICheckInService {
	constructor(
		@InjectRepository(CheckInEntity)
		private checkInRepository: Repository<CheckInEntity>,
		@InjectRepository(CheckInParkingSpaceEntity)
		private checkInParkingSpaceRepository: Repository<CheckInParkingSpaceEntity>,
		@InjectRepository(CheckInCustomerEntity)
		private checkInCustomerRepository: Repository<CheckInCustomerEntity>,
		@InjectRepository(CheckInVehicleEntity)
		private checkInVehicleRepository: Repository<CheckInVehicleEntity>,
		@Inject(PARKING_SPACE_SERVICE)
		private parkingSpaceService: IParkingSpaceService,
		@Inject(CUSTOMER_SERVICE)
		private customerService: ICustomerService,
		@Inject(VEHICLE_SERVICE)
		private vehicleService: IVehicleService,
	) { }

	getAll = async () => {
		const checkInList = await this.checkInRepository.find()
		return checkInList;
	}

	getById = async (id: string) => {
		const selectedCheckIn = await this.checkInRepository.findOneBy({ id })
		if (selectedCheckIn == null) throw new Error(`CheckIn com id ${id} não encontrado.`)
		return selectedCheckIn;
	}

	async open(parkingSpaceId: string, customer: CustomerDto) {

		// Verificar se a vaga existe e está vazia.
		const existentParkingSpace = await this.parkingSpaceService.getById(parkingSpaceId);

		if (existentParkingSpace === null) throw new HttpException(new CommonResponse<CheckInEntity>(StatusEnum.failure, "Espaço de estacionamento não encontrado.", null), HttpStatus.NOT_FOUND);
		if (existentParkingSpace.parked_customer) throw new HttpException(new CommonResponse<CheckInEntity>(StatusEnum.failure, "Espaço de estacionamento está ocupado.", null), HttpStatus.BAD_REQUEST);


		// Pegar customer com veículo.
		let existentCustomer = await this.customerService.getByCpf(customer.cpf);

		// Se customer não existir ainda, inserir veículo e customer no banco.
		if (!existentCustomer) {
			// Insere veículo
			var createdVehicle = await this.vehicleService.create(customer.vehicle);
			// Atribui veículo com Id ao customer
			customer.vehicle = createdVehicle
			// existentCustomer.vehicle = createdVehicle
			// Insere customer
			existentCustomer = await this.customerService.create(customer);
		}

		// Atribui PK do customer ao parking space
		existentParkingSpace.parked_customer = existentCustomer

		// Criar CheckIn.
		const checkInEntity = new CheckInEntity({
			parking_space: existentParkingSpace,
			hour_entered: (new Date()).toISOString(),
			hour_exited: null,
			total_price: null,
		})
		// console.log('existentParkingSpace', existentParkingSpace)
		// console.log('existentCustomer', existentCustomer)
		// console.log('existentVehicle', existentVehicle)

		// Criar tabelas de histórico do checkIn (check_in_vehicle)
		await this.checkInVehicleRepository.save(createdVehicle)
		// Criar tabelas de histórico do checkIn (check_in_customer)
		await this.checkInCustomerRepository.save(existentCustomer)
		// Criar tabelas de histórico do checkIn (check_in_parking_space)
		await this.checkInParkingSpaceRepository.save(existentParkingSpace)

		// Inserir CheckIn no banco.
		await this.checkInRepository.save(checkInEntity)

		// Ocupar ParkingSpace.
		await this.parkingSpaceService.occupy(existentParkingSpace.id, customer.cpf);

		return checkInEntity

	}

	async close(id: string) {

		const selectedCheckIn = await this.getById(id)

		function CalculateTotalPrice(): number {
			var StartHour = new Date(selectedCheckIn.hour_entered);
			var EndHour = new Date();
			var PricePerHour = selectedCheckIn.parking_space.price_per_hour;
			var FinePerHour = selectedCheckIn.parking_space.fine_per_hour;
			var LimitTimeInHours = selectedCheckIn.parking_space.limit_time_in_hours;

			var ParkedHours = (EndHour.getTime() - StartHour.getTime());

			var FinePrice = ParkedHours > LimitTimeInHours ? (FinePerHour * (ParkedHours - LimitTimeInHours)) : 0;

			var FinalPrice = (PricePerHour * ParkedHours) + (FinePrice);

			if (FinalPrice == 0) FinalPrice = PricePerHour;

			return FinalPrice
		}

		async function SaveToDatabase() {
			selectedCheckIn.hour_exited = new Date().toISOString()
			selectedCheckIn.total_price = CalculateTotalPrice();

			this.checkInRepository.update(id, selectedCheckIn);
		}

		await SaveToDatabase();

		return selectedCheckIn;
	}

}

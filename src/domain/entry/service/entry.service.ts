import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntryEntity } from '../entity/entry.entity';
import { Repository } from 'typeorm';
import { IEntryService } from './entry.service.interface';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';
import { CustomerDto } from 'src/domain/customer/dto/customer.dto';
import { IParkingSpaceService, PARKING_SPACE_SERVICE } from 'src/domain/parking-space/service/parking-space.interface';
import { CUSTOMER_SERVICE, ICustomerService } from 'src/domain/customer/service/customer.interface';
import { IVehicleService, VEHICLE_SERVICE } from 'src/domain/customer/service/vehicle.interface';
import { EntryParkingSpaceEntity } from '../entity/entry-parkingspace.entity';
import { EntryCustomerEntity } from '../entity/entry-customer.entity';
import { EntryVehicleEntity } from '../entity/entry-vehicle.entity';
import { VehicleEntity } from 'src/domain/customer/entity/vehicle.entity';
import { CustomerEntity } from 'src/domain/customer/entity/customer.entity';

@Injectable()
export class EntryService implements IEntryService {
	constructor(
		@InjectRepository(EntryEntity)
		private entryRepository: Repository<EntryEntity>,
		@InjectRepository(EntryParkingSpaceEntity)
		private entryParkingSpaceRepository: Repository<EntryParkingSpaceEntity>,
		@InjectRepository(EntryCustomerEntity)
		private entryCustomerRepository: Repository<EntryCustomerEntity>,
		@InjectRepository(EntryVehicleEntity)
		private entryVehicleRepository: Repository<EntryVehicleEntity>,
		@Inject(PARKING_SPACE_SERVICE)
		private parkingSpaceService: IParkingSpaceService,
		@Inject(CUSTOMER_SERVICE)
		private customerService: ICustomerService,
		@Inject(VEHICLE_SERVICE)
		private vehicleService: IVehicleService,
	) { }

	getAll = async () => {
		const entryList = await this.entryRepository.find({ relations: { parking_space: true } })
		return entryList;
	}

	getById = async (id: string) => {
		const selectedEntry = await this.entryRepository.findOne({ where: { id }, relations: { parking_space: true } })
		if (selectedEntry == null) throw new Error(`Entry com id ${id} não encontrado.`)
		return selectedEntry;
	}

	async checkin(parkingSpaceId: string, customer: CustomerDto) {

		// Verificar se a vaga existe e está vazia.
		const existentParkingSpace = await this.parkingSpaceService.getById(parkingSpaceId);

		if (existentParkingSpace === null) throw new HttpException(new CommonResponse<EntryEntity>(StatusEnum.failure, "Espaço de estacionamento não encontrado.", null), HttpStatus.NOT_FOUND);
		if (existentParkingSpace.parked_customer) throw new HttpException(new CommonResponse<EntryEntity>(StatusEnum.failure, "Espaço de estacionamento está ocupado.", null), HttpStatus.BAD_REQUEST);


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

		// Criar Entry.
		const entryEntity = new EntryEntity({
			parking_space: existentParkingSpace,
			checkin_date: (new Date()).toISOString(),
			checkout_date: null,
			total_price: null,
		})

		// Criar tabelas de histórico do entry (check_in_vehicle)
		await this.entryVehicleRepository.save(existentCustomer.vehicle)
		// Criar tabelas de histórico do entry (check_in_customer)
		await this.entryCustomerRepository.save(existentCustomer)
		// Criar tabelas de histórico do entry (check_in_parking_space)
		await this.entryParkingSpaceRepository.save(existentParkingSpace)

		// Inserir Entry no banco.
		await this.entryRepository.save(entryEntity)

		// Ocupar ParkingSpace.
		await this.parkingSpaceService.occupy(existentParkingSpace.id, customer.cpf);

		return entryEntity

	}

	async checkout(id: string) {
		const selectedEntry = await this.getById(id)

		if (selectedEntry.checkout_date) throw new Error(
			`Entry já finalizado. Horário de saída: ${selectedEntry.checkout_date}. Preço total: ${selectedEntry.total_price}`
		)

		function CalculateTotalPrice(): number {
			const StartHour = new Date(selectedEntry.checkin_date);
			const EndHour = new Date();
			const PricePerHour = selectedEntry.parking_space.price_per_hour;
			const FinePerHour = selectedEntry.parking_space.fine_per_hour;
			const LimitTimeInHours = selectedEntry.parking_space.limit_time_in_hours;

			const ParkedMiliseconds = EndHour.getTime() - StartHour.getTime();
			const ParkedHours = ParkedMiliseconds / (1000 * 60 * 60);

			const FinePrice = ParkedHours > LimitTimeInHours ? (FinePerHour * (ParkedHours - LimitTimeInHours)) : 0;

			let FinalPrice = (PricePerHour * ParkedHours) + (FinePrice);

			if (FinalPrice == 0) FinalPrice = PricePerHour;

			return Math.round(FinalPrice)
		}

		selectedEntry.checkout_date = new Date().toISOString()
		selectedEntry.total_price = CalculateTotalPrice();

		await this.entryRepository.save(selectedEntry);

		return selectedEntry;
	}
}

import { Inject, Injectable } from '@nestjs/common';
import { IParkingSpaceService } from './parking-space.interface';
import { ParkingSpaceWithoutCustomerDto } from '../dto/parking-space.dto';
import { ParkingSpaceEntity } from '../entity/parking-space.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/domain/customer/service/customer.service';
import { CUSTOMER_SERVICE } from 'src/domain/customer/service/customer.interface';
import { CustomerEntity } from 'src/domain/customer/entity/customer.entity';

@Injectable()
export class ParkingSpaceService implements IParkingSpaceService {
	constructor(
		@InjectRepository(ParkingSpaceEntity)
		private parkingSpaceRepository: Repository<ParkingSpaceEntity>,
		@Inject(CUSTOMER_SERVICE)
		private customerService: CustomerService
	) { }

	async getAll() {
		const getAllRes = await this.parkingSpaceRepository.find();
		return getAllRes;
	}

	async getByIdOrError(id: string) {
		const getOneRes = await this.parkingSpaceRepository.findOne({ where: { id }, relations: { parked_customer: true } });
		if (getOneRes == null) throw new Error(`Espaço de estacionamento com Id ${id} não encontrado.`)
		return getOneRes;
	}

	async create(parkingSpaceDto: ParkingSpaceWithoutCustomerDto) {
		const parkingSpaceEntity = new ParkingSpaceEntity({
			parked_customer: null,
			price_per_hour: parkingSpaceDto.pricePerHour,
			fine_per_hour: parkingSpaceDto.finePerHour,
			floor: parkingSpaceDto.floor,
			limit_time_in_hours: parkingSpaceDto.limitTimeInHours,
			type: parkingSpaceDto.type
		})
		const createdParkingSpace = await this.parkingSpaceRepository.save(parkingSpaceEntity);
		return createdParkingSpace;
	}

	async edit(parkingSpaceId: string, parkingSpaceDto: ParkingSpaceWithoutCustomerDto) {
		// Getting parking space to be edited.
		const parkingSpaceToEdit: ParkingSpaceEntity = await this.getByIdOrError(parkingSpaceId)

		// Fails if parking space if occupied.
		if (parkingSpaceToEdit.parked_customer) throw new Error(`Espaço de estacionamento está ocupado. Desocupe-o antes de editá-lo.`)
		// throw new Exception(CommonResponseResultEnum.BAD_REQUEST.ToString(), new Exception("Espaço de estacionamento ocupado."));

		// Assigning new data to entity.
		parkingSpaceToEdit.fine_per_hour = parkingSpaceDto.finePerHour
		parkingSpaceToEdit.floor = parkingSpaceDto.floor
		parkingSpaceToEdit.limit_time_in_hours = parkingSpaceDto.limitTimeInHours
		parkingSpaceToEdit.price_per_hour = parkingSpaceDto.pricePerHour
		parkingSpaceToEdit.type = parkingSpaceDto.type

		// Updating entity in DB;
		await this.parkingSpaceRepository.update(parkingSpaceId, parkingSpaceToEdit)

		return parkingSpaceToEdit;
	}

	async occupy(parkingSpaceId: string, customerCpf: string) {
		const selectedParkingSpace: ParkingSpaceEntity = await this.getByIdOrError(parkingSpaceId);

		const customer: CustomerEntity = await this.customerService.getByCpfOrError(customerCpf)

		selectedParkingSpace.parked_customer = customer;

		await this.parkingSpaceRepository.update(parkingSpaceId, selectedParkingSpace);

		return selectedParkingSpace;
	}

	async liberate(id: string) {
		// Getting parking space to be liberated.
		const selectedParkingSpace: ParkingSpaceEntity = await this.getByIdOrError(id);
		// Setting "parked_customer" to null;
		selectedParkingSpace.parked_customer = null;
		// Updating in DB;
		await this.parkingSpaceRepository.update(id, selectedParkingSpace);

		return selectedParkingSpace;
	}
}

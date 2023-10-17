import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IParkingSpaceService } from './parking-space.interface';
import { ParkingSpaceDto, ParkingSpaceWithoutCustomerDto } from '../dto/parking-space.dto';
import { ParkingSpaceEntity } from '../entity/parking-space.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from 'src/domain/customer/entity/customer.entity';
import { CommonResponse, StatusEnum } from 'src/shared/response-object/common.response';

@Injectable()
export class ParkingSpaceService implements IParkingSpaceService {
	constructor(
		@InjectRepository(ParkingSpaceEntity)
		private parkingSpaceRepository: Repository<ParkingSpaceEntity>,
		@InjectRepository(CustomerEntity)
		private customerRepository: Repository<CustomerEntity>
	) { }

	create = async (parkingSpaceDto: ParkingSpaceWithoutCustomerDto) => {

		const parkingSpaceEntity = new ParkingSpaceEntity({
			parked_customer: null,
			price_per_hour: parkingSpaceDto.pricePerHour,
			fine_per_hour: parkingSpaceDto.finePerHour,
			floor: parkingSpaceDto.floor,
			limit_time_in_hours: parkingSpaceDto.limitTimeInHours,
			type: parkingSpaceDto.type
		})

		const createRes = await this.parkingSpaceRepository.save(parkingSpaceEntity);


		return parkingSpaceEntity;
	}

	edit = async (parkingSpaceId: string, parkingSpaceDto: ParkingSpaceWithoutCustomerDto) => {
		// Getting parking space to be edited.
		const parkingSpaceToEdit = await this.getById(parkingSpaceId)

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

	getAll = async () => {
		const getAllRes = await this.parkingSpaceRepository.find();

		return getAllRes;
	}

	getById = async (id: string) => {
		const getOneRes = await this.parkingSpaceRepository.findOne({ where: { id }, relations: { parked_customer: true } });

		if (getOneRes == null) throw new Error(`Espaço de estacionamento com Id ${id} não encontrado.`)

		return getOneRes;
	}

	occupy = async (parkingSpaceId: string, customerCpf: string) => {
		const selectedParkingSpace = await this.getById(parkingSpaceId);
		if (selectedParkingSpace === null) throw new Error(`Espaço de estacionamento com Id ${parkingSpaceId} não encontrado.`)

		const customer = await this.customerRepository.findOne({ where: { cpf: customerCpf }, relations: { vehicle: true } })
		if (customer === null) throw new Error(`Cliente com CPF ${customerCpf} não encontrado.`)

		selectedParkingSpace.parked_customer = customer;

		await this.parkingSpaceRepository.update(parkingSpaceId, selectedParkingSpace);

		return selectedParkingSpace;
	}

	liberate = async (id: string) => {
		// Getting parking space to be liberated.
		const selectedParkingSpace = await this.getById(id);
		// Setting "parked_customer" to null;
		selectedParkingSpace.parked_customer = null;
		// Updating in DB;
		await this.parkingSpaceRepository.update(id, selectedParkingSpace);

		return selectedParkingSpace;
	}
}

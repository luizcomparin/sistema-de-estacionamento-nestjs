import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IVehicleService } from './vehicle.interface';
import { VehicleDto } from '../dto/vehicle.dto';
import { VehicleEntity } from '../entity/vehicle.entity';

@Injectable()
export class VehicleService implements IVehicleService {
	constructor(
		@InjectRepository(VehicleEntity)
		private vehicleRepository: Repository<VehicleEntity>,
	) { }

	async getAll(): Promise<VehicleEntity[]> {
		const allVehicles = await this.vehicleRepository.find()
		return allVehicles;
	}

	async getByPlate(plate: string): Promise<VehicleEntity> {
		const selectedVehicle = await this.vehicleRepository.findOneBy({ plate })
		// if (selectedVehicle == null) throw new Error(`Veículo com placa ${plate} não encontrado.`)
		return selectedVehicle;
	}

	async getById(id: string): Promise<VehicleEntity> {
		const selectedVehicle = await this.vehicleRepository.findOneBy({ id })
		// if (selectedVehicle == null) throw new Error(`Veículo com id ${id} não encontrado.`)
		return selectedVehicle;
	}

	async create(vehicle: VehicleDto): Promise<VehicleEntity> {
		const vehicleEntity = new VehicleEntity({
			color: vehicle.color,
			model: vehicle.model,
			plate: vehicle.plate,
			type: vehicle.type
		})
		// const as = await this.vehicleRepository.insert(vehicleEntity)
		const createdVehicle = await this.vehicleRepository.save(vehicleEntity)

		return createdVehicle
	}
}

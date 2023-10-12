import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../entity/vehicle.entity';

@Injectable()
export class VehicleService {
	constructor(
		@InjectRepository(VehicleEntity)
		private vehicleRepository: Repository<VehicleEntity>,
	) { }

	async getAll() {
		return await this.vehicleRepository.find()
	}

	async create(vehicle: VehicleEntity) {
		return await this.vehicleRepository.insert(vehicle)
	}
}

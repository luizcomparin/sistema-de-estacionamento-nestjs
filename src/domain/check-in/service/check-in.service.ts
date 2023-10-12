import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckInEntity } from '../entity/check-in.entity';
import { Repository } from 'typeorm';
import { ICheckInService } from './check-in.service.interface';

@Injectable()
export class CheckInService implements ICheckInService {
	constructor(
		@InjectRepository(CheckInEntity)
		private checkInRepository: Repository<CheckInEntity>,
	) { }

	async getAll() {
		return await this.checkInRepository.find()
	}

	async create(checkIn: CheckInEntity) {
		return await this.checkInRepository.insert(checkIn)
	}
}

import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './service/parking-space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpaceEntity } from './entity/parking-space.entity';
import { ParkingSpaceController } from './controller/parking-space.controller';
import { PARKING_SPACE_SERVICE } from './service/parking-space.interface';
import { CustomerEntity } from '../customer/entity/customer.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ParkingSpaceEntity, CustomerEntity])],
	controllers: [ParkingSpaceController],
	// providers: [ParkingSpaceService,],
	providers: [{
		useClass: ParkingSpaceService,
		provide: PARKING_SPACE_SERVICE
	}],
	// exports: [ParkingSpaceService]
})
export class ParkingSpaceModule { }

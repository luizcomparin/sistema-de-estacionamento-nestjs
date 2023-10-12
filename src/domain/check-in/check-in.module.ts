import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInService } from './service/check-in.service';
import { CheckInController } from './controller/check-in.controller';
import { CheckInEntity } from './entity/check-in.entity';
import { CheckInParkingSpaceEntity } from './entity/checkin-parkingspace.entity';
import { CheckInVehicleEntity } from './entity/check-in-vehicle.entity';
import { CheckInCustomerEntity } from './entity/check-in-customer.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CheckInEntity, CheckInParkingSpaceEntity, CheckInVehicleEntity, CheckInCustomerEntity])],
	controllers: [CheckInController],
	providers: [CheckInService],
	exports: [CheckInService]
})
export class CheckInModule { }

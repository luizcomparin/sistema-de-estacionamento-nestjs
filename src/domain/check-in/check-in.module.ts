import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInService } from './service/check-in.service';
import { CheckInController } from './controller/check-in.controller';
import { CheckInEntity } from './entity/check-in.entity';
import { CheckInParkingSpaceEntity } from './entity/checkin-parkingspace.entity';
import { CheckInVehicleEntity } from './entity/check-in-vehicle.entity';
import { CheckInCustomerEntity } from './entity/check-in-customer.entity';
import { CHECKIN_SERVICE } from './service/check-in.service.interface';
import { ParkingSpaceService } from '../parking-space/service/parking-space.service';
import { CUSTOMER_SERVICE } from '../customer/service/customer.interface';
import { PARKING_SPACE_SERVICE } from '../parking-space/service/parking-space.interface';
import { CustomerService } from '../customer/service/customer.service';
import { VEHICLE_SERVICE } from '../customer/service/vehicle.interface';
import { VehicleService } from '../customer/service/vehicle.service';
import { ParkingSpaceEntity } from '../parking-space/entity/parking-space.entity';
import { CustomerEntity } from '../customer/entity/customer.entity';
import { VehicleEntity } from '../customer/entity/vehicle.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CheckInEntity, CheckInParkingSpaceEntity, CheckInVehicleEntity, CheckInCustomerEntity, ParkingSpaceEntity, CustomerEntity, VehicleEntity])],
	controllers: [CheckInController],
	providers: [{
		provide: CHECKIN_SERVICE,
		useClass: CheckInService
	},
	{
		provide: PARKING_SPACE_SERVICE,
		useClass: ParkingSpaceService
	},
	{
		provide: CUSTOMER_SERVICE,
		useClass: CustomerService
	},
	{
		provide: VEHICLE_SERVICE,
		useClass: VehicleService
	}],
	// exports: [CheckInService]
})
export class CheckInModule { }

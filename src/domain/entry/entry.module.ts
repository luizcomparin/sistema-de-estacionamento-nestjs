import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryService } from './service/entry.service';
import { EntryController } from './controller/entry.controller';
import { EntryEntity } from './entity/entry.entity';
import { EntryParkingSpaceEntity } from './entity/entry-parkingspace.entity';
import { EntryVehicleEntity } from './entity/entry-vehicle.entity';
import { EntryCustomerEntity } from './entity/entry-customer.entity';
import { ENTRY_SERVICE } from './service/entry.service.interface';
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
	imports: [TypeOrmModule.forFeature([EntryEntity, EntryParkingSpaceEntity, EntryVehicleEntity, EntryCustomerEntity, ParkingSpaceEntity, CustomerEntity, VehicleEntity])],
	controllers: [EntryController],
	providers: [{
		provide: ENTRY_SERVICE,
		useClass: EntryService
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
	// exports: [EntryService]
})
export class EntryModule { }

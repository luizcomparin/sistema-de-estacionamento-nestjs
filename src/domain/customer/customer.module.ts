import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entity/vehicle.entity';
import { CustomerEntity } from './entity/customer.entity';
import { CustomerService } from './service/customer.service';
import { VehicleService } from './service/vehicle.service';
import { CustomerController } from './controller/customer/customer.controller';
import { VehicleController } from './controller/vehicle/vehicle.controller';

@Module({
	imports: [TypeOrmModule.forFeature([CustomerEntity, VehicleEntity])],
	// controllers: [VehicleController],
	providers: [CustomerService, VehicleService],
	exports: [CustomerService, VehicleService],
	controllers: [CustomerController, VehicleController]
})
export class CustomerModule { }

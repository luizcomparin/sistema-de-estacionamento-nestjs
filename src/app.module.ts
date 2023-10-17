import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EntryModule } from './domain/entry/entry.module';
import { ParkingSpaceModule } from './domain/parking-space/parking-space.module';
import { CustomerModule } from './domain/customer/customer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot(), DatabaseModule, EntryModule, ParkingSpaceModule, CustomerModule,],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }

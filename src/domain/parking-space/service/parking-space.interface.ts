import { CustomerEntity } from "src/domain/customer/entity/customer.entity";
import { ParkingSpaceDto } from "../dto/parking-space.dto";
import { ParkingSpaceEntity } from "../entity/parking-space.entity";

export const PARKING_SPACE_SERVICE = 'PARKING SPACE SERVICE';


export interface IParkingSpaceService {
	create: (parkingSpaceDto: ParkingSpaceDto) => Promise<ParkingSpaceEntity>

	edit: (parkingSpaceId: string, parkingSpaceDto: ParkingSpaceDto) => Promise<ParkingSpaceEntity>

	getAll: () => Promise<ParkingSpaceEntity[]>

	getById: (id: string) => Promise<ParkingSpaceEntity>

	occupy: (id: string, customerId: string) => Promise<ParkingSpaceEntity>

	liberate: (id: string) => Promise<ParkingSpaceEntity>
}

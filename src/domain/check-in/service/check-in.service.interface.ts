import { CustomerDto } from "src/domain/customer/dto/customer.dto";
import { CheckInEntity } from "../entity/check-in.entity";

export const CHECKIN_SERVICE = 'CHECKIN SERVICE';

export interface ICheckInService {
	getAll: () => Promise<CheckInEntity[]>;

	getById: (id: string) => Promise<CheckInEntity>

	open: (parkingSpaceId: string, customer: CustomerDto) => Promise<CheckInEntity>

	close: (id: string) => Promise<CheckInEntity>
}

import { CustomerDto } from "src/domain/customer/dto/customer.dto";
import { EntryEntity } from "../entity/entry.entity";

export const ENTRY_SERVICE = 'ENTRY SERVICE';

export interface IEntryService {
	getAll: () => Promise<EntryEntity[]>;

	getById: (id: string) => Promise<EntryEntity>

	checkin: (parkingSpaceId: string, customer: CustomerDto) => Promise<EntryEntity>

	checkout: (id: string) => Promise<EntryEntity>
}

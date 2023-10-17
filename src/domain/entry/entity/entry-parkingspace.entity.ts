import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { EntryCustomerEntity } from "./entry-customer.entity";


@Entity({ name: "entry_parking_space" })
export class EntryParkingSpaceEntity {
	@PrimaryColumn({ nullable: false })
	id: string

	@Column({ nullable: false })
	type: string

	@Column({ nullable: false })
	floor: string

	@Column({ nullable: false })
	price_per_hour: number

	@Column({ nullable: false })
	fine_per_hour: number

	@Column({ nullable: false })
	limit_time_in_hours: number

	@OneToOne(() => EntryCustomerEntity)
	@JoinColumn()
	parked_customer: EntryCustomerEntity

	public constructor(init?: Partial<EntryParkingSpaceEntity>) {
		Object.assign(this, init);
	}
}

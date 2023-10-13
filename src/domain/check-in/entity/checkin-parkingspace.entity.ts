import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { CheckInCustomerEntity } from "./check-in-customer.entity";


@Entity({ name: "check_in_parking_space" })
export class CheckInParkingSpaceEntity {
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

	@OneToOne(() => CheckInCustomerEntity)
	@JoinColumn()
	parked_customer: CheckInCustomerEntity

	public constructor(init?: Partial<CheckInParkingSpaceEntity>) {
		Object.assign(this, init);
	}
}

import { CustomerEntity } from "src/domain/customer/entity/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "parking_space" })
export class ParkingSpaceEntity {
	@PrimaryGeneratedColumn('uuid')
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

	@OneToOne(() => CustomerEntity)
	@JoinColumn()
	parked_customer: CustomerEntity


	public constructor(init?: Partial<ParkingSpaceEntity>) {
		Object.assign(this, init);
	}
}

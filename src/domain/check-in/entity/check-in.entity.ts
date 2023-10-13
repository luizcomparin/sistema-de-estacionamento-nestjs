import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CheckInParkingSpaceEntity } from "./checkin-parkingspace.entity";


@Entity({ name: "check_in" })
export class CheckInEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn({ name: 'hour_entered', type: 'timestamp', nullable: false })
	hour_entered: string

	@CreateDateColumn({ name: 'hour_exited', type: 'timestamp', nullable: true, default: null })
	hour_exited: string

	@Column({ name: 'total_price', nullable: true })
	total_price: number

	@OneToOne(() => CheckInParkingSpaceEntity)
	@JoinColumn()
	parking_space: CheckInParkingSpaceEntity

	public constructor(init?: Partial<CheckInEntity>) {
		Object.assign(this, init);
	}
}

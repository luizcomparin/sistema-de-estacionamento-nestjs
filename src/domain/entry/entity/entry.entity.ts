import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntryParkingSpaceEntity } from "./entry-parkingspace.entity";


@Entity({ name: "entry" })
export class EntryEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn({ name: 'checkin_date', type: 'timestamp', nullable: false })
	checkin_date: string

	@CreateDateColumn({ name: 'checkout_date', type: 'timestamp', nullable: true, default: null })
	checkout_date: string

	@Column({ name: 'total_price', nullable: true })
	total_price: number

	@OneToOne(() => EntryParkingSpaceEntity)
	@JoinColumn()
	parking_space: EntryParkingSpaceEntity

	public constructor(init?: Partial<EntryEntity>) {
		Object.assign(this, init);
	}
}

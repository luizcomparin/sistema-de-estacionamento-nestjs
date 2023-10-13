import { ParkingSpaceEntity } from "src/domain/parking-space/entity/parking-space.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "vehicle" })
export class VehicleEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ name: 'plate', nullable: false })
	plate: string

	@Column({ name: 'model', nullable: true })
	model: string

	@Column({ name: 'color', nullable: false })
	color: string

	@Column({ name: 'type', nullable: false })
	type: string

	public constructor(init?: Partial<VehicleEntity>) {
		Object.assign(this, init);
	}
}

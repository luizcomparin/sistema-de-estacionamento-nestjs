import { ParkingSpaceEntity } from "src/domain/parking-space/entity/parking-space.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VehicleEntity } from "./vehicle.entity";


@Entity({ name: "customer" })
export class CustomerEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ name: 'first_name', nullable: false })
	first_name: string

	@Column({ name: 'last_name', nullable: true })
	last_name: string

	@Column({ name: 'cellphone', nullable: false })
	cellphone: string

	@Column({ name: 'cpf', nullable: false })
	cpf: string

	@OneToOne(() => VehicleEntity)
	@JoinColumn()
	vehicle: VehicleEntity

	public constructor(init?: Partial<CustomerEntity>) {
		Object.assign(this, init);
	}
}

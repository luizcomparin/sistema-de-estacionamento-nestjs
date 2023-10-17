import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { EntryVehicleEntity } from "./entry-vehicle.entity";


@Entity({ name: "entry_customer" })
export class EntryCustomerEntity {
	@PrimaryColumn({ nullable: false })
	id: string

	@Column({ nullable: false })
	first_name: string

	@Column({ nullable: false })
	last_name: string

	@Column({ nullable: false })
	cellphone: string

	@Column({ nullable: false })
	cpf: string

	@OneToOne(() => EntryVehicleEntity)
	@JoinColumn()
	vehicle: EntryVehicleEntity

	public constructor(init?: Partial<EntryCustomerEntity>) {
		Object.assign(this, init);
	}
}

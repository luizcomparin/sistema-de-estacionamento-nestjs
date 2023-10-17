import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: "entry_vehicle" })
export class EntryVehicleEntity {
	@PrimaryColumn({ nullable: false })
	id: string

	@Column({ nullable: false })
	plate: string

	@Column({ nullable: false })
	model: string

	@Column({ nullable: false })
	color: string

	@Column({ nullable: false })
	type: string

	public constructor(init?: Partial<EntryVehicleEntity>) {
		Object.assign(this, init);
	}
}

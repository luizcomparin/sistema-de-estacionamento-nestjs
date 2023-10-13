import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: "check_in_vehicle" })
export class CheckInVehicleEntity {
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

	public constructor(init?: Partial<CheckInVehicleEntity>) {
		Object.assign(this, init);
	}
}

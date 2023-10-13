import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { CheckInVehicleEntity } from "./check-in-vehicle.entity";


@Entity({ name: "check_in_customer" })
export class CheckInCustomerEntity {
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

	@OneToOne(() => CheckInVehicleEntity)
	@JoinColumn()
	vehicle: CheckInVehicleEntity

	public constructor(init?: Partial<CheckInCustomerEntity>) {
		Object.assign(this, init);
	}
}

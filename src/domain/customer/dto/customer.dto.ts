import { IsString, ValidateNested } from "class-validator"
import { VehicleDto } from "./vehicle.dto"

export class CustomerDto {

	@IsString()
	first_name: string

	@IsString()
	last_name: string

	@IsString()
	cellphone: string

	@IsString()
	cpf: string

	@ValidateNested()
	vehicle: VehicleDto
}

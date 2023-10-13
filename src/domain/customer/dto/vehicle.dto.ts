import { IsString } from "class-validator"

export class VehicleDto {

	id: string

	@IsString()
	plate: string

	@IsString()
	model: string

	@IsString()
	color: string

	@IsString()
	type: string
}

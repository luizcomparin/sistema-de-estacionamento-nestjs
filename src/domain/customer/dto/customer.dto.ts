import { IsString, ValidateNested } from "class-validator"
import { VehicleDto } from "./vehicle.dto"
import { ApiProperty } from "@nestjs/swagger"

export class CustomerDto {
	// @ApiProperty()
	@IsString()
	first_name: string

	// @ApiProperty()
	@IsString()
	last_name: string

	// @ApiProperty()
	@IsString()
	cellphone: string

	// @ApiProperty()
	@IsString()
	cpf: string

	// @ApiProperty()
	@ValidateNested()
	vehicle: VehicleDto
}

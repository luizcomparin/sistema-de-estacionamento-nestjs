import { IsDefined, IsEmpty, IsInt, IsNumber, IsString, ValidateNested } from "class-validator"
import { IsNull } from "typeorm"


export abstract class ParkingSpaceDto {

	parkedCustomerId?: string | null

	@IsString({ message: "Missing 'Type' property." })
	type: string

	@IsString({ message: "Missing 'Floor' property." })
	floor: string

	@IsInt({ message: "Missing 'Price_per_Hour' property." })
	pricePerHour: number

	@IsInt({ message: "Missing 'Fine_per_Hour' property." })
	finePerHour: number

	@IsInt({ message: "Missing 'Limit_Time_In_Hours' property." })
	limitTimeInHours: number
}

export class ParkingSpaceWithoutCustomerDto implements Omit<ParkingSpaceDto, "parkedCustomerId"> {
	@IsString({ message: "Missing 'Type' property." })
	type: string;

	@IsString({ message: "Missing 'Floor' property." })
	floor: string;

	@IsInt({ message: "Missing 'Price_per_Hour' property." })
	pricePerHour: number;

	@IsInt({ message: "Missing 'Fine_per_Hour' property." })
	finePerHour: number;

	@IsInt({ message: "Missing 'Limit_Time_In_Hours' property." })
	limitTimeInHours: number;
}

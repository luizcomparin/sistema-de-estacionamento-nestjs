import { VehicleDto } from "../dto/vehicle.dto"
import { VehicleEntity } from "../entity/vehicle.entity"

export const VEHICLE_SERVICE = "VEHICLE SERVICE"

export interface IVehicleService {
	getAll(): Promise<VehicleEntity[]>

	getByPlate(plate: string): Promise<VehicleEntity>

	getById(id: string): Promise<VehicleEntity>

	create(vehicle: VehicleDto): Promise<VehicleEntity>
}

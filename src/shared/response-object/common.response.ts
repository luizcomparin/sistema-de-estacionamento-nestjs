
// EXEMPLO DO VITÃO DE COMO UTILIZAR INTERFACES GENERICAS PARA TIPAR O RESPONSE DAS APIS

import { ApiProperty } from "@nestjs/swagger"

export enum StatusEnum {
	success = 'success',
	failure = 'failure',
}

interface IResponse<T> {
	status: StatusEnum
	message: string
	result: T
}

export class CommonResponse<T> implements IResponse<T>{
	@ApiProperty()
	status: StatusEnum
	@ApiProperty()
	message: string
	@ApiProperty()
	result: T
	constructor(status: StatusEnum, message: string, result: any) {
		this.status = status,
			this.message = message,
			this.result = result
	}
}

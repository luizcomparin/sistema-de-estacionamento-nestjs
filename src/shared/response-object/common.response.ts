
// EXEMPLO DO VITÃO DE COMO UTILIZAR INTERFACES GENERICAS PARA TIPAR O RESPONSE DAS APIS

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
	status: StatusEnum
	message: string
	result: T
	constructor(status: StatusEnum, message: string, result: any) {
		this.status = status,
			this.message = message,
			this.result = result
	}
}

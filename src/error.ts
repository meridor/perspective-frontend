class BaseError implements Error {
    
    name:string;
    message:string;

    constructor(name: string, message?: string) {
        super(name, message);
    }
    
}

export class ApplicationError extends BaseError {

    constructor(message:string) {
        super('applicatioError', message);
    }
}
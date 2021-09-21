const handle = (promise:any) =>{
    return promise
        .then((data:any) => [null, data])
        .catch((err:any) => [err, null]);
}
//@ts-ignore
class BadRequestError extends Error{
    statusCode: any;
    message: any;
    constructor(statusCode:any, message: string){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = {
    handle,
    BadRequestError,
}
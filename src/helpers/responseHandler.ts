import { Response } from "express";

 export class ResponseHandler {
    constructor() {}

    static SendResponse(res:Response, status:number, message?: string, data?: any) {
        const successStatusCode = [200,201];
        const defaultErrorMessage = 'Internal Server Error';
        const defaultSuccessMessage = 'Data sent successfully'
        if(status && successStatusCode.includes(status)) {
        return res.status(status).json({success: true, message: message || defaultSuccessMessage, data});
        }
        return res.status(status || 500).json({success: false, message: message || defaultErrorMessage,data})
    }

}

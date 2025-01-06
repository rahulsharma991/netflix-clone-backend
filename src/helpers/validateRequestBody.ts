import { Request } from "express";
export class ValidateRequestBody {
    static validate(keys: string[],request:Request) {
            if(request  && request.body && keys.length > 0) {
                for(let i = 0; i < keys.length; i++) {
                    if(!request.body?.hasOwnProperty(keys[i])) {
                        return false;
                    }
                }
                return true
        }
    }
}

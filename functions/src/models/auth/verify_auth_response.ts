import {BaseResponse} from "../../base/base_response";

export class VerifyResponse implements BaseResponse {

    constructor({id, email}:
        {id?: string, email?: string}) {
        this.id = id;
        this.email = email;
    }

    id: any;
    email: any;

    toJson(): any {
        return {
            'id': this.id,
            'email': this.email,
        }
    }
}

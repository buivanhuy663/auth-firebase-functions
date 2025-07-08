import {BaseResponse} from "../../base/base_response";

export class LoginResponse implements BaseResponse {

    constructor({id, email, token}: {id?: string, email?: string, token?: string}) {
        this.id = id;
        this.email = email;
        this.token = token;
    }

    id: any;
    email: any;
    token: any;

    toJson(): any {
        return {
            'id': this.id,
            'email': this.email,
            'token': this.token,
        }
    }
}

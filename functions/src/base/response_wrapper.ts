import {BaseResponse} from "./base_response";

export class ResponseWraper<M extends BaseResponse | undefined> implements BaseResponse {

    constructor({status, message, data}: {status?: number, message?: string, data?: M}) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    status: any;
    message: any;
    data: M | undefined;

    toJson() {
        return {
            'status': this.status,
            'message': this.message,
            'data': this.data?.toJson()
        }
    }
}

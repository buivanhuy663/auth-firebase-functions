import {Timestamp} from "firebase-admin/firestore";

export class AuthCodeInfo {
    constructor(
        readonly email: string,
        readonly password: string,
        readonly authCode: string,
        readonly timestamp: Timestamp,
    ) { }

    static fromJson(json: any) {

        return new AuthCodeInfo(
            json['email'],
            json['password'],
            json['authCode'],
            json['timestamp'],
        )
    }
}

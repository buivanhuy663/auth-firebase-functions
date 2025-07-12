import { DocumentData, Timestamp } from "firebase-admin/firestore";

export class AuthCodeInfo {
    constructor(
        readonly email: string,
        readonly password: string,
        readonly authCode: string,
        readonly timestamp: Timestamp,
    ) { }

    static fromJson(data: DocumentData | undefined) {
        if (data)
            return new AuthCodeInfo(
                data['email'],
                data['password'],
                data['authCode'],
                data['timestamp'],
            )
        else
            return undefined
    }
}

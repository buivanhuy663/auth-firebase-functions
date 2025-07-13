import * as admin from "firebase-admin"
import { UserRecord } from "firebase-admin/auth"

class AuthHelper {
    constructor() { }

    createUser(uid: string, email: string): Promise<UserRecord> {
        return admin.auth().createUser({
            uid: uid,
            email: email,
        })
    }

    createCustomToken(uid: any): Promise<string> {
        return admin.auth().createCustomToken(uid)
    }

    getUserByEmail(email: any): Promise<UserRecord> {
        return admin.auth().getUserByEmail(email)
    }


    deleteUser = async (
        uid: any,
    ): Promise<void> => {
        await admin.auth().deleteUser(uid)
    }
}

export const authHelper = new AuthHelper()


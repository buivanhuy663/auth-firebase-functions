import * as admin from "firebase-admin"

class AuthHelper {
    constructor() { }

    deleteUser = async (
        uid: any,
    ): Promise<void> => {
        await admin.auth().deleteUser(uid)
    }

    createCustomToken(uid: any): Promise<string> {
        return admin.auth().createCustomToken(uid)
    }

}

export const authHelper = new AuthHelper()


import * as admin from "firebase-admin"
import { DataSnapshot } from "firebase-admin/database"

class DataBaseHelper {
    constructor() { }

    getValue = async (key: string): Promise<DataSnapshot> => {
        const snapshot = await admin.database().ref("accounts/").get()
        return snapshot
    }

    setValue = async (key: string, value: any): Promise<void> => {
        await admin.database().ref(key).set(value)
    }

    pushValue = async (key: string, value: any): Promise<void> => {
        await admin.database().ref(key).push(value)
    }
}

export const databaseHelper = new DataBaseHelper()


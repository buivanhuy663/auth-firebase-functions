import { DocumentData } from "firebase-admin/firestore"
import { PromiseUseCase } from "../base/use_case/promise_use_case"
import { firestoreHelper } from "../helper/firestore_helper"
import { ConstantKey } from "../utilities/constant_key"
import { authHelper } from "../helper/auth_helper"

class DeleteDataAccountUseCase implements PromiseUseCase<string, DocumentData | void> {
    async run(email: string): Promise<DocumentData | void> {

        const accountId = (await firestoreHelper.getDocument(ConstantKey.accountsAuth, email)).data()?.id

        try {
            await firestoreHelper.deleteDocument(ConstantKey.accountAuthCode, email)
        } catch (error) {
            console.log(error)
        }
        try {
            await firestoreHelper.deleteDocument(ConstantKey.accountsInfos, accountId)
        } catch (error) {
            console.log(error)
        }

        // final delete account auth
        try {
            await firestoreHelper.deleteDocument(ConstantKey.accountsAuth, email)
        } catch (error) {
            console.log(error)
        }

        try {
            const uid = (await authHelper.getUserByEmail(email)).uid
            await authHelper.deleteUser(uid)
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteDataAccountUseCase = new DeleteDataAccountUseCase()

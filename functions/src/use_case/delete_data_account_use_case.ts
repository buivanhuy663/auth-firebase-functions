import { DocumentData } from "firebase-admin/firestore"
import { PromiseUseCase } from "../base/use_case/promise_use_case"
import { firestoreHelper } from "../helper/firestore_helper"
import { ConstantKey } from "../utilities/constant_key"

class DeleteDataAccountUseCase implements PromiseUseCase<string, DocumentData | void> {
    async run(input: string): Promise<DocumentData | void> {

        const accountId = (await firestoreHelper.getDocument(ConstantKey.accountsAuth, input)).data()?.id


        try {
            await firestoreHelper.deleteDocument(ConstantKey.accountAuthCode, input)
        } catch (error) {

        }
        try {
            await firestoreHelper.deleteDocument(ConstantKey.accountsInfos, accountId)
        } catch (error) {

        }

        // final delete account auth
        try {
            await firestoreHelper.deleteDocument(ConstantKey.accountsAuth, input)
        } catch (error) {

        }
    }
}

export const deleteDataAccountUseCase = new DeleteDataAccountUseCase()

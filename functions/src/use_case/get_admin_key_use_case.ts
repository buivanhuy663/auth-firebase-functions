import { DocumentData } from "firebase-admin/firestore"
import { PromiseOutputUseCase } from "../base/use_case/promise_output_use_case"
import { firestoreHelper } from "../helper/firestore_helper"
import { ConstantKey } from "../utilities/constant_key"

class GetAdminKeyUseCase implements PromiseOutputUseCase<DocumentData | undefined> {
    async run(): Promise<DocumentData | undefined> {
        const data = await firestoreHelper.getDocument(ConstantKey.config, ConstantKey.docEmail)
        return data.data()
    }
}

export const getAdminKeyUseCase = new GetAdminKeyUseCase()


import {DocumentData} from "firebase-admin/firestore"
import {PromiseUseCase} from "../../base/use_case/promise_use_case"
import {firestoreHelper} from "../../helper/firestore_helper"
import {ConstantKey} from "../../utilities/constant_key"

class GetAuthUseCase implements PromiseUseCase<string, DocumentData | undefined> {
    async run(input: string): Promise<DocumentData | undefined> {
        const data = await firestoreHelper.getDocument(ConstantKey.accountsAuth, input)
        return data.data()
    }
}

export const getAuthUseCase = new GetAuthUseCase()

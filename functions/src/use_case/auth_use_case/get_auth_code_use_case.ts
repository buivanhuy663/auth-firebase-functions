import {DocumentData} from "firebase-admin/firestore"
import {PromiseUseCase} from "../../base/use_case/promise_use_case"
import {firestoreHelper} from "../../helper/firestore_helper"
import {ConstantKey} from "../../utilities/constant_key"

class GetAuthCodeUseCase implements PromiseUseCase<string, DocumentData | undefined> {
    async run(input: string): Promise<DocumentData | undefined> {
        const data = await firestoreHelper.getDocument(ConstantKey.accountAuthCode, input)
        return data.data()
    }
}

export const getAuthCodeUseCase = new GetAuthCodeUseCase()

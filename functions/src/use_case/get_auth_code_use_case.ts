import { PromiseUseCase } from "../base/use_case/promise_use_case"
import { firestoreHelper } from "../helper/firestore_helper"
import { ConstantKey } from "../utilities/constant_key"
import { AuthCodeInfo } from "../models/auth_code_info"

class GetAuthCodeUseCase implements PromiseUseCase<string, AuthCodeInfo | undefined> {
    async run(input: string): Promise<AuthCodeInfo | undefined> {
        const data = await firestoreHelper.getDocument(ConstantKey.accountAuthCode, input)
        return AuthCodeInfo.fromJson(data.data())
    }
}

export const getAuthCodeUseCase = new GetAuthCodeUseCase()

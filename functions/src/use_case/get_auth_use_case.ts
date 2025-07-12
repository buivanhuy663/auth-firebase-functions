import { PromiseUseCase } from "../base/use_case/promise_use_case"
import { firestoreHelper } from "../helper/firestore_helper"
import { ConstantKey } from "../utilities/constant_key"
import { AccountAuth } from "../models/account_auth"

class GetAuthUseCase implements PromiseUseCase<string, AccountAuth | undefined> {
    async run(input: string): Promise<AccountAuth | undefined> {
        const data = await firestoreHelper.getDocument(ConstantKey.accountsAuth, input)
        return AccountAuth.fromJson(data)
    }
}

export const getAuthUseCase = new GetAuthUseCase()

import {PromiseUseCase} from "../../base/use_case/promise_use_case"
import {firestoreHelper} from "../../helper/firestore_helper"
import {ConstantKey} from "../../utilities/constant_key"

class ResetAuthCodeUseCase implements PromiseUseCase<string, any> {
    async run(input: string): Promise<any> {
        return await firestoreHelper.setDocument(ConstantKey.accountAuthCode, input, {x: 0})
    }
}

export const resetAuthCodeUseCase = new ResetAuthCodeUseCase()

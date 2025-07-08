import {PromiseUseCase} from "../../base/use_case/promise_use_case"
import {firestoreHelper} from "../../helper/firestore_helper"
import {Account} from "../../models/account"
import {ConstantKey} from "../../utilities/constant_key"

class SetAccountToFirestoreUseCase implements PromiseUseCase<Account, void> {
    async run(input: Account): Promise<void> {
        await firestoreHelper.setDocument(
            ConstantKey.accountsInfos,
            input.id,
            input.toJson(),
        )
    }
}

export const setAccountToFirestoreUseCase = new SetAccountToFirestoreUseCase()

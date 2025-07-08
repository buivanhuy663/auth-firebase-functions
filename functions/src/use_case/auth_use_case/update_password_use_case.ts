import {PromiseUseCase} from "../../base/use_case/promise_use_case"
import {firestoreHelper} from "../../helper/firestore_helper"
import {ChangePasswordModel} from "../../models/change_password_model"
import {ConstantKey} from "../../utilities/constant_key"

class UpdatePasswordUseCase implements PromiseUseCase<ChangePasswordModel, void> {
    async run(input: ChangePasswordModel): Promise<void> {
        await firestoreHelper.updateDoc(
            ConstantKey.accountsAuth,
            input.email,
            input.toJson(),
        )
    }
}

export const updatePasswordUseCase = new UpdatePasswordUseCase()

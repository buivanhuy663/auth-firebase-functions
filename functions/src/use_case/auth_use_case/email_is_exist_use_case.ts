import {PromiseUseCase} from "../../base/use_case/promise_use_case";
import {firestoreHelper} from "../../helper/firestore_helper";
import {ConstantKey} from "../../utilities/constant_key";

class EmailIsExistUseCase implements PromiseUseCase<string, boolean> {
    async run(input: string): Promise<boolean> {

        const data = (await firestoreHelper.getDocument(ConstantKey.accountsAuth, input)).data()
        if (data != undefined) {
            return data['email'] == input
        }
        return false;
    }
}

export const emailIsExistUseCase = new EmailIsExistUseCase()

import {PromiseUseCase} from "../../base/use_case/promise_use_case";
import {firestoreHelper} from "../../helper/firestore_helper";
import {Account} from "../../models/account";
import {AccountAuth} from "../../models/account_auth";
import {ConstantKey} from "../../utilities/constant_key";

class CreateNewAccountUseCase implements
    PromiseUseCase<{email: string, password: string}, string | null> {
    async run(input: {email: string; password: string;}): Promise<string | null> {
        try {
            const newDoc = await firestoreHelper.getNewDoc(ConstantKey.accountsInfos)
            await firestoreHelper.setDocument(
                ConstantKey.accountsAuth,
                input.email,
                new AccountAuth({
                    email: input.email,
                    id: newDoc.id,
                    password: input.password
                }).toJson(),
            )
            await newDoc.set(new Account({id: newDoc.id, email: input.email}).toJson())
            return newDoc.id;
        } catch (e) {
            return null;
        }
    }
}

export const createNewAccountUseCase = new CreateNewAccountUseCase()

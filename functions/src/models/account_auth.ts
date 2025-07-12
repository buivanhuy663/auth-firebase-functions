import { DocumentData } from "firebase-admin/firestore"

export class AccountAuth {

    constructor(
        {
            id,
            email,
            password,
        }: {
            id: string
            email: string
            password: string
        }) {

        this.id = id
        this.email = email
        this.password = password
    }

    id: string;
    email: string;
    password: string;

    toJson(): any {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
        };
    }

    static fromJson(data: DocumentData | undefined): AccountAuth | undefined {
        if (data) {
            return new AccountAuth({
                id: data.id,
                email: data.email,
                password: data.password,
            });
        }
        return undefined;
    }
}

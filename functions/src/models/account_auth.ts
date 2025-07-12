export class AccountAuth {

    constructor(
        {
            id,
            email,
            password,
        }: {
            id: string,
            email: string,
            password: string,
        }) {
        this.id = id;
        this.email = email;
        this.password = password;
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

    static fromJson(json: any): AccountAuth {
        return new AccountAuth({
            id: json.id,
            email: json.email,
            password: json.password,
        });
    }
}

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

    id: any;
    email: any;
    password: any;

    toJson(): any {
        return {
            'id': this.id,
            'email': this.email,
            'password': this.password,
        }
    }
}

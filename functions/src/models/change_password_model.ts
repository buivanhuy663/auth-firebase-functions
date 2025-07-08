export class ChangePasswordModel {

    constructor({email, password}: {email?: string, password?: string}) {
        this.email = email;
        this.password = password;
    }

    email: any;
    password: any;

    toJson(): any {
        return {
            password: this.password,
        }
    }
}

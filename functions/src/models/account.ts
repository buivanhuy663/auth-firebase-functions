export class Account {

    constructor({id, email}: {id?: string, email?: string}) {
        this.id = id;
        this.email = email;
    }

    id: any;
    email: any;

    toJson(): any {
        return {
            'id': this.id,
            'email': this.email,
        }
    }
}

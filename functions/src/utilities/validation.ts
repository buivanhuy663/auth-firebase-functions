
export class Validation {
    static isEmail(email: string): boolean {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(email);
    }

    static isPassowrd(password: string): boolean {
        return password.length >= 8;
    }
}

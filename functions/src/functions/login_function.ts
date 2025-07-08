
import {ParamsDictionary} from "express-serve-static-core";
import * as admin from "firebase-admin";
import {Request} from "firebase-functions/v1";
import {BaseFunction} from "../base/base_function";
import {ResponseWraper} from "../base/response_wraper";
import {LoginResponse} from "../models/auth/login_response";
import {getAuthUseCase} from "../use_case/auth_use_case/get_auth_use_case";

class LoginFunction
    implements BaseFunction<ResponseWraper<LoginResponse | undefined>> {

    async onRequest(request: Request<ParamsDictionary>):
        Promise<ResponseWraper<LoginResponse | undefined>> {
        try {
            const email = request.body["email"]
            const password = request.body["password"]

            const data = await getAuthUseCase.run(email)
            if (data != undefined) {
                if (data['email'] == email && data['password'] == password) {
                    const token = await admin.auth().createCustomToken(data.id);
                    return new ResponseWraper({
                        status: 200,
                        message: "Login Success",
                        data: new LoginResponse({
                            id: data['id'],
                            email: data['email'],
                            token: token,
                        })
                    })
                }
            }
            throw Error()
        } catch (e) {
            return new ResponseWraper({
                status: 400,
                message: "Login fail",
                data: undefined
            })
        }
    }
}

export const loginFunction = new LoginFunction()





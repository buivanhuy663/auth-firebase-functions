
import { ParamsDictionary } from "express-serve-static-core";
import * as admin from "firebase-admin";
import { Request } from "firebase-functions/v1";
import { BaseFunction } from "../base/base_function";
import { ResponseWrapper } from "../base/response_wrapper";
import { LoginResponse } from "../models/auth/login_response";
import { getAuthUseCase } from "../use_case/get_auth_use_case";
import { StatusCodes } from "http-status-codes";

class LoginFunction
    implements BaseFunction<ResponseWrapper<LoginResponse | undefined>> {

    async onRequest(request: Request<ParamsDictionary>):
        Promise<ResponseWrapper<LoginResponse | undefined>> {
        try {
            const email = request.body["email"]
            const password = request.body["password"]

            const accountAuth = await getAuthUseCase.run(email)
            if (accountAuth != undefined) {
                if (accountAuth.email == email && accountAuth.password == password) {
                    const token = await admin.auth().createCustomToken(accountAuth.id);
                    return new ResponseWrapper({
                        status: StatusCodes.OK,
                        message: "Login Success",
                        data: new LoginResponse({
                            id: accountAuth.id,
                            email: accountAuth.email,
                            token: token,
                        })
                    })
                }
            }
            return new ResponseWrapper({
                status: StatusCodes.UNAUTHORIZED,
                message: "Invalid Email or Password",
                data: undefined
            })
        } catch (e) {
            return new ResponseWrapper({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
                data: undefined
            })
        }
    }
}

export const loginFunction = new LoginFunction()





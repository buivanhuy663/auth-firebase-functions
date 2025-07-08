
import { ParamsDictionary } from "express-serve-static-core";
import { Request } from "firebase-functions/v1";
import { BaseFunction } from "../base/base_function";
import { ResponseWrapper } from "../base/response_wrapper";
import { ChangePasswordModel } from "../models/change_password_model";
import { getAuthUseCase } from "../use_case/auth_use_case/get_auth_use_case";

import { updatePasswordUseCase } from "../use_case/auth_use_case/update_password_use_case";
import { Validation } from "../utilities/validation";

class ChangePasswordFunction
    implements BaseFunction<ResponseWrapper<undefined>> {
    async onRequest(request: Request<ParamsDictionary>): Promise<ResponseWrapper<undefined>> {
        try {
            const email = request.body["email"]
            const oldPassword = request.body["oldPassword"]
            const newPassword = request.body["newPassword"]

            const data = await getAuthUseCase.run(email);
            if (data != undefined) {
                if (oldPassword == data.password) {
                    if (Validation.isPassword(newPassword)) {
                        await updatePasswordUseCase.run(new ChangePasswordModel({ email: email, password: newPassword }))
                        return new ResponseWrapper({
                            status: 200,
                            message: "Change password success",
                            data: undefined
                        })
                    } else {
                        return new ResponseWrapper({
                            status: 400,
                            message: "New password is invalid",
                            data: undefined
                        })
                    }
                }
            }
            throw Error()
        } catch (e) {
            return new ResponseWrapper({
                status: 400,
                message: "Change password fail",
                data: undefined
            })
        }
    }

}

export const changePasswordFunction = new ChangePasswordFunction()





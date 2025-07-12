
import { ParamsDictionary } from "express-serve-static-core";
import { Request } from "firebase-functions/v1";
import { BaseFunction } from "../base/base_function";
import { ResponseWrapper } from "../base/response_wrapper";
import { ChangePasswordModel } from "../models/change_password_model";
import { getAuthUseCase } from "../use_case/get_auth_use_case";

import { updatePasswordUseCase } from "../use_case/update_password_use_case";
import { Validation } from "../utilities/validation";
import { StatusCodes } from "http-status-codes";

class ChangePasswordFunction
    implements BaseFunction<ResponseWrapper<undefined>> {
    async onRequest(request: Request<ParamsDictionary>): Promise<ResponseWrapper<undefined>> {
        try {
            const email = request.body["email"]
            const oldPassword = request.body["oldPassword"]
            const newPassword = request.body["newPassword"]

            const accountAuth = await getAuthUseCase.run(email);
            if (accountAuth != undefined) {
                if (oldPassword == accountAuth.password) {
                    if (Validation.isPassword(newPassword)) {
                        await updatePasswordUseCase.run(new ChangePasswordModel({ email: email, password: newPassword }))
                        return new ResponseWrapper({
                            status: StatusCodes.OK,
                            message: "Change password success",
                            data: undefined
                        })
                    } else {
                        return new ResponseWrapper({
                            status: StatusCodes.UNAUTHORIZED,
                            message: "New password is invalid",
                            data: undefined
                        })
                    }
                } else {
                    return new ResponseWrapper({
                        status: StatusCodes.UNAUTHORIZED,
                        message: "Old password is invalid",
                        data: undefined
                    })
                }
            }
            return new ResponseWrapper({
                status: StatusCodes.NOT_FOUND,
                message: "User not found",
                data: undefined
            })
        } catch (e) {
            return new ResponseWrapper({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal server error",
                data: undefined
            })
        }
    }

}

export const changePasswordFunction = new ChangePasswordFunction()





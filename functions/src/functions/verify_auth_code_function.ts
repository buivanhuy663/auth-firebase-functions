import { ParamsDictionary } from "express-serve-static-core";
import { Request } from "firebase-functions/v1";
import { StatusCodes } from "http-status-codes";
import { BaseFunction } from "../base/base_function";
import { ResponseWrapper } from "../base/response_wrapper";
import { VerifyResponse } from "../models/auth/verify_auth_response";
import { createNewAccountUseCase } from "../use_case/create_new_account_use_case";
import { getAuthCodeUseCase } from "../use_case/get_auth_code_use_case";
import { resetAuthCodeUseCase } from "../use_case/reset_auth_code_use_case";
import { timestampToNow } from "../utilities/timestamp_to_now";


class VerifyAuthCodeFunction implements BaseFunction<ResponseWrapper<VerifyResponse | undefined>> {
    async onRequest(request: Request<ParamsDictionary>): Promise<ResponseWrapper<VerifyResponse | undefined>> {
        try {
            const email = request.body.email
            const authCode = request.body.authCode

            const authCodeInfo = await getAuthCodeUseCase.run(email)

            if (authCodeInfo != undefined) {
                if (timestampToNow(authCodeInfo.timestamp) < 60 * 5) {
                    if (authCode == authCodeInfo.authCode) {
                        resetAuthCodeUseCase.run(email)
                        const accountId = await createNewAccountUseCase.run({ email: email, password: authCodeInfo.password })
                        if (accountId != undefined) {
                            return new ResponseWrapper({
                                status: StatusCodes.OK,
                                message: 'Success',
                                data: new VerifyResponse({
                                    id: accountId,
                                    email: email,
                                })
                            })
                        }
                    } else {
                        return new ResponseWrapper({
                            status: StatusCodes.BAD_REQUEST,
                            message: 'Validation code is not correct',
                        })
                    }
                } else {
                    return new ResponseWrapper({
                        status: StatusCodes.BAD_REQUEST,
                        message: 'Validation code expires',
                    })
                }
            } else {
                return new ResponseWrapper({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Email is not registered',
                })
            }
            throw new Error()
        }
        catch (err: any) {
            return new ResponseWrapper({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            })
        }
    }

}

export const verifyAuthCodeFunction = new VerifyAuthCodeFunction()



import {ParamsDictionary} from "express-serve-static-core";
import {Request} from "firebase-functions/v1";
import {StatusCodes} from "http-status-codes";
import {BaseFunction} from "../base/base_function";
import {ResponseWraper} from "../base/response_wraper";
import {VerifyResponse} from "../models/auth/verify_auth_response";
import {AuthCodeInfo} from "../models/auth_code_info";
import {createNewAccountUseCase} from "../use_case/auth_use_case/create_new_account_use_case";
import {getAuthCodeUseCase} from "../use_case/auth_use_case/get_auth_code_use_case";
import {resetAuthCodeUseCase} from "../use_case/auth_use_case/reset_auth_code_use_case";
import {timestampToNow} from "../utilities/timestamp_to_now";


class VerifyAuthCodeFunction implements BaseFunction<ResponseWraper<VerifyResponse | undefined>>{
    async onRequest(request: Request<ParamsDictionary>): Promise<ResponseWraper<VerifyResponse | undefined>> {
        try {
            const email = request.body.email
            const authCode = request.body.authCode

            const data = await getAuthCodeUseCase.run(email)

            if (data != undefined) {
                const authCodeInfo = AuthCodeInfo.fromJson(data)
                if (timestampToNow(authCodeInfo.timestamp) < 60 * 5) {
                    if (authCode == authCodeInfo.authCode) {
                        resetAuthCodeUseCase.run(email)
                        const accountId = await createNewAccountUseCase.run({email: email, password: authCodeInfo.password})
                        if (accountId != undefined) {
                            return new ResponseWraper({
                                status: StatusCodes.OK,
                                message: 'Success',
                                data: new VerifyResponse({
                                    id: accountId,
                                    email: email,

                                })
                            })
                        }
                    } else {
                        return new ResponseWraper({
                            status: StatusCodes.BAD_REQUEST,
                            message: 'Invalid',
                        })
                    }
                } else {
                    return new ResponseWraper({
                        status: StatusCodes.GONE,
                        message: 'Expired',
                    })
                }
            }
            return new ResponseWraper({
                status: StatusCodes.BAD_REQUEST,
                message: 'Error',
            })
        }
        catch (err: any) {
            return new ResponseWraper({
                status: StatusCodes.BAD_REQUEST,
                message: 'Error',
            })
        }
    }

}

export const verifyAuthCodeFunction = new VerifyAuthCodeFunction()



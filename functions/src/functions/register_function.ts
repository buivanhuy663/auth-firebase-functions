
import {ParamsDictionary} from "express-serve-static-core";
import {FieldValue} from "firebase-admin/firestore";
import {Request} from "firebase-functions/v1";
import {StatusCodes} from "http-status-codes";
import {BaseFunction} from "../base/base_function";
import {ResponseWraper} from "../base/response_wraper";
import {createSendEmail} from "../helper/email/email_helper";
import {firestoreHelper} from "../helper/firestore_helper";
import {emailIsExistUseCase} from "../use_case/auth_use_case/email_is_exist_use_case";
import {ConstantKey} from "../utilities/constant_key";
import {Validation} from "../utilities/validation";

class RegisterFunction
    implements BaseFunction<ResponseWraper<undefined>>{

    async onRequest(request: Request<ParamsDictionary>): Promise<ResponseWraper<undefined>> {
        try {
            const email = request.body.email
            const password = request.body.password


            const isExist = await emailIsExistUseCase.run(email)
            if (!Validation.isEmail(email)) {
                return new ResponseWraper({
                    status: StatusCodes.OK,
                    message: 'Email is invalid',
                })
            }

            if (!Validation.isPassowrd(password)) {
                return new ResponseWraper({
                    status: StatusCodes.OK,
                    message: 'Password is invalid',
                })
            }

            if (isExist) {
                return new ResponseWraper({
                    status: StatusCodes.CONFLICT,
                    message: 'Account is exist',
                })
            } else {
                const authCode = ('0' + Math.floor(Math.random() * 999999)).slice(-6)
                const data = {
                    email: email,
                    password: password,
                    authCode: authCode,
                    timestamp: FieldValue.serverTimestamp()
                }
                await firestoreHelper.setDocument(ConstantKey.accountAuthCode, email, data)
                await createSendEmail(email, authCode)

                return new ResponseWraper({
                    status: StatusCodes.OK,
                    message: 'Success',
                })
            }
        }
        catch (err: any) {
            return new ResponseWraper({
                status: StatusCodes.BAD_REQUEST,
                message: 'Regiter is error',
            })
        }
    }
}

export const regiterFunction = new RegisterFunction();


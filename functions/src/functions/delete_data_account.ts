
import { ParamsDictionary } from "express-serve-static-core";
import { Request } from "firebase-functions/v1";
import { BaseFunction } from "../base/base_function";
import { ResponseWraper } from "../base/response_wrapper";
import { LoginResponse } from "../models/auth/login_response";
import { deleteDataAccountUseCase } from "../use_case/auth_use_case/detele_data_account_use_case";

class DeleteDataAccount
    implements BaseFunction<ResponseWraper<LoginResponse | undefined>> {

    async onRequest(request: Request<ParamsDictionary>):
        Promise<ResponseWraper<LoginResponse | undefined>> {
        try {
            const email = request.body["email"]
            await deleteDataAccountUseCase.run(email)
            return new ResponseWraper({
                status: 200,
                message: "Delete Success",
            })
        } catch (e) {
            return new ResponseWraper({
                status: 400,
                message: "Delete fail",
                data: undefined
            })
        }
    }
}

export const deleteDataAccountFunction = new DeleteDataAccount()





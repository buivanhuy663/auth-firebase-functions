
import { ParamsDictionary } from "express-serve-static-core";
import { Request } from "firebase-functions/v1";
import { BaseFunction } from "../base/base_function";
import { ResponseWrapper } from "../base/response_wrapper";
import { LoginResponse } from "../models/auth/login_response";
import { deleteDataAccountUseCase } from "../use_case/auth_use_case/detele_data_account_use_case";

class DeleteDataAccount
    implements BaseFunction<ResponseWrapper<LoginResponse | undefined>> {

    async onRequest(request: Request<ParamsDictionary>):
        Promise<ResponseWrapper<LoginResponse | undefined>> {
        try {
            const email = request.body["email"]
            await deleteDataAccountUseCase.run(email)
            return new ResponseWrapper({
                status: 200,
                message: "Delete Success",
            })
        } catch (e) {
            return new ResponseWrapper({
                status: 400,
                message: "Delete fail",
                data: undefined
            })
        }
    }
}

export const deleteDataAccountFunction = new DeleteDataAccount()





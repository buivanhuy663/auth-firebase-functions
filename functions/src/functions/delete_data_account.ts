
import { ParamsDictionary } from "express-serve-static-core";
import { Request } from "firebase-functions/v1";
import { BaseFunction } from "../base/base_function";
import { ResponseWrapper } from "../base/response_wrapper";
import { LoginResponse } from "../models/auth/login_response";
import { deleteDataAccountUseCase } from "../use_case/delete_data_account_use_case";
import { getAdminKeyUseCase } from "../use_case/get_admin_key_use_case";
import { StatusCodes } from "http-status-codes";

class DeleteDataAccount
    implements BaseFunction<ResponseWrapper<LoginResponse | undefined>> {

    async onRequest(request: Request<ParamsDictionary>):
        Promise<ResponseWrapper<LoginResponse | undefined>> {
        try {
            const email = request.body["email"]
            const adminKey = request.body["adminKey"]

            const adminKeyConfig = await getAdminKeyUseCase.run()
            if (adminKeyConfig && adminKey === adminKeyConfig.key) {
                await deleteDataAccountUseCase.run(email)
                return new ResponseWrapper({
                    status: StatusCodes.OK,
                    message: "Delete Success",
                })
            }

            return new ResponseWrapper({
                status: StatusCodes.UNAUTHORIZED,
                message: "Unauthorized",
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

export const deleteDataAccountFunction = new DeleteDataAccount()





/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https"
 * import {onDocumentWritten} from "firebase-functions/v2/firestore"
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin"
import { onRequest } from "firebase-functions/v2/https"

import { setGlobalOptions } from "firebase-functions/v2"
import { changePasswordFunction } from "./functions/change_password_function"
import { deleteDataAccountFunction } from "./functions/delete_data_account"
import { loginFunction } from "./functions/login_function"
import { registerFunction } from "./functions/register_function"
import { verifyAuthCodeFunction } from "./functions/verify_auth_code_function"

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 })
admin.initializeApp()
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const register = onRequest(async (request, response) => {
    const result = await registerFunction.onRequest(request)
    response.status(result.status).send(result.toJson())
})

export const verifyAuthCode = onRequest(async (request, response) => {
    const result = await verifyAuthCodeFunction.onRequest(request)
    response.status(result.status).send(result.toJson())
})

export const login = onRequest(async (request, response) => {
    const result = await loginFunction.onRequest(request)
    response.status(result.status).send(result.toJson())
})

export const changePassword = onRequest(async (request, response) => {
    const result = await changePasswordFunction.onRequest(request)
    response.status(result.status).send(result.toJson())
})

export const deleteDataAccount = onRequest(async (request, response) => {
    const result = await deleteDataAccountFunction.onRequest(request)
    response.status(result.status).send(result.toJson())
})

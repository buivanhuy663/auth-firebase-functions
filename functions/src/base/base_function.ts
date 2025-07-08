import {Request} from "firebase-functions/v1";

export interface BaseFunction<Output> {
    onRequest(request: Request): Promise<Output>
}

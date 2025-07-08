import {Timestamp} from "firebase-admin/firestore"

export function timestampToNow(timestamp: any): number {
    const previous = (timestamp as Timestamp).seconds
    const now = Timestamp.now().seconds
    return now - previous
}

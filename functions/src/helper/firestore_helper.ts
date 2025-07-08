import * as admin from "firebase-admin"
import { DocumentData, DocumentReference, DocumentSnapshot, QuerySnapshot, WriteResult } from "firebase-admin/firestore"

class FirestoreHelper {
    constructor() { }


    getByValue = async (
        collection: string,
        child: string,
        value: any,): Promise<QuerySnapshot<DocumentData>> => {
        const data = await admin.firestore().collection(collection).where(child, '==', value).get()
        return data
    }

    getDocument = async (
        collection: string,
        doc: string,): Promise<DocumentSnapshot<DocumentData>> => {
        const data = await admin.firestore().collection(collection).doc(doc).get()
        return data
    }

    setDocument = async (collection: string, doc: string, value: any): Promise<void> => {
        await admin.firestore().collection(collection).doc(doc).set(value)
    }

    addDocument = async (collection: string, value: any):
        Promise<DocumentReference<DocumentData>> => {
        return await admin.firestore().collection(collection).add(value)
    }

    getNewDoc = async (collection: string): Promise<DocumentReference<DocumentData>> => {
        return admin.firestore().collection(collection).doc()
    }

    updateDoc = async (collection: string, doc: string, data: any): Promise<WriteResult> => {
        return await admin.firestore().collection(collection).doc(doc).update(data)
    }

    deleteDocument = async (collection: string, doc: string): Promise<WriteResult> => {
        return await admin.firestore().collection(collection).doc(doc).delete()
    }
}

export const firestoreHelper = new FirestoreHelper()


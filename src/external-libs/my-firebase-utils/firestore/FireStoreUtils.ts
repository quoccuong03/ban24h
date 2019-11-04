import {FirebaseInit} from "../FirebaseInit";
import {firestore} from "firebase";
import firebase from "firebase/app"

export interface QueryParams {
    equal?: { fieldName: string, value: string | number }
    limit?: number //
}


export class FireStoreUtils {
    public static async getDocDataFromPath(colRef: firestore.CollectionReference, docPath: string) {
        return FireStoreUtils.getDocData(colRef.doc(docPath));
    }

    public static async getDocData(docRef: firestore.DocumentReference) {
        return docRef.get();
    }

    public static async queryCollection(colRef: firestore.CollectionReference,
                                        result: (doc: firestore.QueryDocumentSnapshot) => void, // doc.data()
                                        queryParams?: QueryParams) {
        let query: firestore.Query = colRef;
        if (queryParams != null) {
            let {equal, limit} = queryParams;
            if (equal != null)
                query = query.where(equal.fieldName, "==", equal.value);
            if (limit != null)
                query = query.limit(limit);
        }
        let querySnapshot = await query.get();
        querySnapshot.forEach(result);
    }

    public static setData(params: { collection: string, doc: string, data: object }) {
        let db = FireStoreUtils.getDB();
        return db.collection(params.collection).doc(params.doc).set(params.data, {merge: true});
    }

    public static updateData(params: { collection: string, doc: string, data: object }) {
        let db = FireStoreUtils.getDB();
        return db.collection(params.collection).doc(params.doc).set(params.data, {merge: true});
    }


    // Thực hiện nhiều lệnh đồng thời, đảm bảo tất cả thành công, nếu chỉ cần 1 không thành công => coi như chưa làm gì
    // Đảm bảo đọc trước, write sau
    // Sử dụng t.get, t.set, t.update để cập nhật và đọc dữ liệu từ database
    public static executeTransaction(updateFunction: (t: firebase.firestore.Transaction) => Promise<void>) {
        let db = FireStoreUtils.getDB();
        return db.runTransaction(updateFunction);
    }

    public static getDB() {
        FirebaseInit.initializeApp();
        return firebase.firestore();
    }

    public static async deleteCollection(path) {
        let db = FireStoreUtils.getDB();
        let snapShot = await db.collection(path).get();
        snapShot.forEach((doc) => {
            doc.ref.delete();
        });
    }
}

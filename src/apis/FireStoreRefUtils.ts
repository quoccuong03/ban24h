import {User} from "../models/ObjsType";
import {FireStoreUtils} from "../external-libs/my-firebase-utils/firestore/FireStoreUtils";

export class FireStoreRefUtils {
    public static getTinOfUserColecRef() {
        return FireStoreUtils.getDB().collection("user_tins");
    }

    public static getTinObjColecRef() {
        return FireStoreUtils.getDB().collection("TinObjs");
    }

    public static getSiteStateColecRef() {
        return FireStoreUtils.getDB().collection("SitesState")
    }


    // là một array của TinStateObj Trên firebase
    public static getTinOfUserDocRef(userId: string) {
        return FireStoreUtils.getDB().collection("user_tins").doc(userId);
    }

    public static getTinObjDocRef(tinObjId: number) {
        return FireStoreUtils.getDB().collection("TinObjs").doc(String(tinObjId));
    }

    public static getSiteStateDocRef(tinObjId: number) {
        return FireStoreUtils.getDB().collection("SitesState").doc(String(tinObjId));
    }

    public static getUserDocRef(userId: string) {
        return FireStoreUtils.getDB().collection("users").doc(userId);
    }

    public static deleteAllCollections() {
        FireStoreUtils.deleteCollection("user_tins");
        FireStoreUtils.deleteCollection("TinObjs");
        FireStoreUtils.deleteCollection("SitesState");
        FireStoreUtils.deleteCollection("users");
    }
}

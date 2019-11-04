import {User} from "../models/ObjsType";
import {FirebaseAuthUtils, UserSigninResult} from "../external-libs/my-firebase-utils/auth/FirebaseAuthUtils";
import {FireStoreUtils} from "../external-libs/my-firebase-utils/firestore/FireStoreUtils";
import {sendError} from "../external-libs/my-common-utils/src";

export class UserAPI {
    static getCurrentUser(): User {
        //TODO test
        return {id: "ExeGUoGICthL66yb7XutWHiRYf52", name: "Quan", email: "Quanptit410@gmail.com"};
    }

    static async createUserWithEmailAndPassword(email: string, password: string): Promise<UserSigninResult> {
        let result = await FirebaseAuthUtils.createUserWithEmailAndPassword(email, password);
        if (result.isSuccess) {
            UserAPI.updateUserDataToFirestore(result.user)
        }
        return result;
    }

    static async signInWithEmailAndPassword(email: string, password: string): Promise<UserSigninResult> {
        let result = await FirebaseAuthUtils.signInWithEmailAndPassword(email, password);
        if (result.isSuccess) {
            UserAPI.updateUserDataToFirestore(result.user)
        }
        return result;
    }

    static async signInWithGoogle(): Promise<UserSigninResult> {
        let result = await FirebaseAuthUtils.signInWithGoogle();
        if (result.isSuccess) {
            UserAPI.updateUserDataToFirestore(result.user)
        }
        return result;
    }

    static async signInWithFaceBook(): Promise<UserSigninResult> {
        let result = await FirebaseAuthUtils.signInWithFaceBook();
        if (result.isSuccess) {
            UserAPI.updateUserDataToFirestore(result.user)
        }
        return result;
    }
    static async singOut() {
        let result = await FirebaseAuthUtils.signOut();
        return result;
    }

    static async resetPassword(email) {
        let result = await FirebaseAuthUtils.resetPassword(email);
        return result;
    }
    
    private static async updateUserDataToFirestore(user: User) {
        try {
            await FireStoreUtils.updateData({data: user, collection: "users", doc: user.id});
        } catch (e) {
            sendError(e);
            //TODO, luu local, thuc hien lai
        }
    }
}

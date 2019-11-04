import {auth} from "firebase";
import {FirebaseInit} from "../FirebaseInit";
import {User} from "../../../models/ObjsType";
import {sendError} from "../../my-common-utils/src";

export type UserSigninResult = { isSuccess?: boolean, errorMessage?: string, errorCode?: string, user?: User }

export class FirebaseAuthUtils {
    static getCurrentUser(): User | null {
        FirebaseInit.initializeApp();
        let user = auth().currentUser;
        if (user == null) return null;
        return {id: user.uid, img: user.photoURL, email: user.email, name: user.displayName};
    }

    static async signInWithFaceBook(remeber: boolean = true) {
        FirebaseInit.initializeApp();
        await FirebaseAuthUtils.setRemeberState(remeber);
        let provider = new auth.FacebookAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        auth().languageCode = 'vi';
        provider.setCustomParameters({
            'display': 'popup'
        });
        let result: UserSigninResult = {};
        try {
            let userCredential = await auth().signInWithPopup(provider)
            result.user = FirebaseAuthUtils.makeUser(userCredential);
            result.isSuccess = true;
        } catch (error) {
            result.isSuccess = false;
            result.errorCode = error.code;
            result.errorMessage = error.message;
        }
        return result;
    }

    static async signInWithGoogle(remeber: boolean = true) {
        FirebaseInit.initializeApp();
        await FirebaseAuthUtils.setRemeberState(remeber);
        let provider = new auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        auth().languageCode = 'vi';
        // provider.setCustomParameters({
        //     'login_hint': 'user@example.com'
        // });
        let result: UserSigninResult = {};
        try {
            let userCredential = await auth().signInWithPopup(provider);
            result.user = FirebaseAuthUtils.makeUser(userCredential);
            result.isSuccess = true;
        } catch (error) {
            result.isSuccess = false;
            result.errorCode = error.code;
            result.errorMessage = error.message;
        }
        return result;
    }

    /** sẽ gửi một Email để người dùng reset password */
    public  static resetPassword(emailAddress) {

        try {
           let result ={isSuccess: true}
           auth().sendPasswordResetEmail(emailAddress)
           return result
        }
        catch (error) {
            let result: UserSigninResult = {};
            result.isSuccess = false;
            result.errorCode = error.code;
            result.errorMessage = error.message;
            return result
        }
    }

    static async signInWithEmailAndPassword(email: string, password: string, remeber: boolean = true): Promise<UserSigninResult> {
        FirebaseInit.initializeApp();
        await FirebaseAuthUtils.setRemeberState(remeber);
        let result: UserSigninResult = {};
        try {
            let userCredential = await auth().signInWithEmailAndPassword(email, password);
            result.user = FirebaseAuthUtils.makeUser(userCredential);
            result.isSuccess = true;

        } catch (error) {
            result.isSuccess = false;
            result.errorCode = error.code;
            let errorMessage;
            switch (error.code) {
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorMessage = "Địa chỉ email, hoặc mật khẩu không chính xác";
                    break;
                default:
                    errorMessage = "Lỗi không xác định. Mã lỗi: " + error.code;
                    break;
            }
            result.errorMessage = errorMessage;
        }
        return result;
    }

    static async createUserWithEmailAndPassword(email: string, password: string, remeber: boolean = true): Promise<UserSigninResult> {
        FirebaseInit.initializeApp();
        await FirebaseAuthUtils.setRemeberState(remeber);
        let result: UserSigninResult = {};
        try {
            let userCredential = await auth().createUserWithEmailAndPassword(email, password);
            result.user = FirebaseAuthUtils.makeUser(userCredential);
            result.isSuccess = true;

        } catch (error) {
            result.isSuccess = false;
            result.errorCode = error.code;
            let errorMessage;
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "Đã tồn tại một tài khoản với địa chỉ email đã cho.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Địa chỉ email không hợp lệ.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Mật khẩu không đủ mạnh.";
                    break;

                default:
                    errorMessage = "Lỗi không xác định. Mã lỗi: " + error.code;
                    break;
            }
            result.errorMessage = errorMessage;
        }
        return result;
    }

    // Khi login/logout .. sẽ làm đối tượng user thay đổi => gọi về callback
    static onAuthStateChanged(callback: (user: firebase.User) => void) {
        FirebaseInit.initializeApp();
        auth().onAuthStateChanged(callback);
    }

    static signOut() {
        FirebaseInit.initializeApp();
        return auth().signOut();
    }

    private static async setRemeberState(remeber?: boolean) {
        try {
            if (remeber)
                await auth().setPersistence(auth.Auth.Persistence.LOCAL);
            else
                await auth().setPersistence(auth.Auth.Persistence.SESSION);
        } catch (e) {
            sendError(e);
        }
    }

    private static makeUser(userCredential): User {
        let userResult = userCredential.user;
        return {name: userResult.displayName, email: userResult.email, id: userResult.uid, img: userResult.photoURL};
    }

}



import * as firebase from "firebase/app";
import {firebaseConfig} from "../../change/Keys";

let initialize = false;

export class FirebaseInit {
    /**
     const firebaseConfig =   {
        apiKey: "AIzaSyAzEhOW4Z2a6EDwAiXKkyEZEgyIprhmpDg",
        authDomain: "dang-tin-bds.firebaseapp.com",
        databaseURL: "https://dang-tin-bds.firebaseio.com",
        projectId: "dang-tin-bds",
        storageBucket: "dang-tin-bds.appspot.com",
        messagingSenderId: "96213956336",
        appId: "1:96213956336:web:e19bb48030f1977e"
    }
     * */
    static initializeApp() {
        if (initialize) return;
        initialize = true;
        firebase.initializeApp(firebaseConfig);
    }
}

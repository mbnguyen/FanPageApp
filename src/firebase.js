import app from "firebase/app";
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD46s19JCzYJmMF59SwOYOTSiyiTJYKvuE",
    authDomain: "fan-page-app-3eb38.firebaseapp.com",
    projectId: "fan-page-app-3eb38",
    storageBucket: "fan-page-app-3eb38.appspot.com",
    messagingSenderId: "410534681522",
    appId: "1:410534681522:web:6f5ac24b70764a481162ab"
  };


class Firebase {
    constructor() {
        // Initialize Firebase
        console.log("INITIALIZED");
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    getCurrentUsername() {
		return this.auth.currentUser;
	}

    async getName() {
        const user = await this.db.doc(`users/${this.auth.currentUser.uid}`).get();
        return user.get('firstName');
    }
}

export default new Firebase();
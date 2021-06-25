import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "AIzaSyD46s19JCzYJmMF59SwOYOTSiyiTJYKvuE",
    authDomain: "fan-page-app-3eb38.firebaseapp.com",
    projectId: "fan-page-app-3eb38",
    storageBucket: "fan-page-app-3eb38.appspot.com",
    messagingSenderId: "410534681522",
    appId: "1:410534681522:web:6f5ac24b70764a481162ab"
};

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut()
	}

	addMessage(msg) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`messages/message`).set({
			msg
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.email;
	}

	async getCurrentUserRole() {
		const role = await this.db.doc(`users/${this.auth.currentUser.uid}`).get();
		return role.get('role');
	}

	async getCurrentUserFirstName() {
		const name = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return name.get('firstName')
	}

	async getCurrentUserDate() {
		const date = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return date.get('date');
	}

	getMessage(props) {
		this.db.collection("messages").doc("message").onSnapshot((doc) => {
        	let msg = doc.get('msg')
			props(msg);
    	});
	}

}

export default new Firebase()
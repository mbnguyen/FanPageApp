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
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.email
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return quote.get('firstName')
	}
}

export default new Firebase()
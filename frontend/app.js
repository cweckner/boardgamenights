const firebaseConfig = {
    apiKey: "AIzaSyB9lr9VuVXHpDJrD-8Fr8lYn-Wna_tXSNA",
    authDomain: "boardgamenights.firebaseapp.com",
    projectId: "boardgamenights",
    storageBucket: "boardgamenights.firebasestorage.app",
    messagingSenderId: "214995919688",
    appId: "1:214995919688:web:60ca82253a0112a22cc97d"
};

// Initiera Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Logga in med Google
document.getElementById('loginButton').addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("Inloggad som:", result.user.displayName);
        })
        .catch((error) => {
            console.error("Fel vid inloggning:", error);
        });
});

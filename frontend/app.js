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


document.getElementById('logoutButton').addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => {
      console.log("Utloggad!");
      document.getElementById('sessionsContainer').innerHTML = '';
    })
    .catch((error) => {
      console.error("Utloggning misslyckades:", error);
    });
});


async function fetchSessions() {
    const response = await fetch('http://localhost:5000/sessions');
    const sessions = await response.json();

    console.log("Aktiva spelkvällar: ", sessions)


}

function renderSessions(sessions) {
    const container = document.getElementById('sessionsContainer');
    container.innerHTML = sessions.map(session => `
    <div class="session-card">
      <h3>${session.title}</h3>
      <p>Deadline: ${session.deadline}</p>
      <button class="vote-button" data-id="${session.id}">Rösta</button>
    </div>
  `).join('');
}

document.querySelectorAll('.vote-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const sessionId = e.target.dataset.id;
        voteOnSession(sessionId);
    });
});

async function voteOnSession(sessionId) {
  const response = await fetch(`http://localhost:5000/session/${sessionId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'christian', timeVotes: ['friday_18'], gameUpvotes: ['catan'] })
  });
  const result = await response.json();
  console.log("Omröstning registrerad:", result);
}


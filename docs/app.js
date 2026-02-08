

async function fetchConfig() {
  try {
    const response = await fetch('https://boardgamenights.onrender.com/config');
    const config = await response.json();
    firebase.initializeApp(config);
    console.log("Firebase har initierats!");
  } catch (error) {
    console.error("Kunde inte ladda konfigurationen:", error);
  }
}

fetchConfig();

// Initiera Firebase

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const baseUrl = "https://boardgamenights.onrender.com"


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
    const response = await fetch(`${baseUrl}/sessions`);
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
  const response = await fetch(`${baseUrl}/session/${sessionId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'christian', timeVotes: ['friday_18'], gameUpvotes: ['catan'] })
  });
  const result = await response.json();
  console.log("Omröstning registrerad:", result);
}

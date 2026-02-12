let firebaseConfig;
let auth;
let provider;
const baseUrl = "https://boardgamenights.onrender.com";
//const baseUrl = "http://localhost:5000";


// Ladda Firebase-konfigurationen
async function fetchConfig() {
  try {
    const response = await fetch(`${baseUrl}/config`);
    firebaseConfig = await response.json();
    initializeFirebase();
  } catch (error) {
    console.error("Kunde inte ladda konfigurationen:", error);
  }
}

// Initiera Firebase
function initializeFirebase() {
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  provider = new firebase.auth.GoogleAuthProvider();

  // Lyssna på autentiseringsstatus
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Användaren är inloggad:", user.displayName);
      if (window.location.pathname.endsWith("index.html") ||
          window.location.pathname === "/boardgamenights/") {
        window.location.href = "planering.html";
      } else {
        fetchSessions();
      }
    } else {
      console.log("Användaren är utloggad");
      if (!window.location.pathname.endsWith("index.html") &&
          !window.location.pathname === "/boardgamenights/") {
        window.location.href = "index.html";
      }
    }
  });
}

// Logga in med Google
function setupLoginButton() {
  const loginButton = document.getElementById('loginButton');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      auth.signInWithPopup(provider)
        .then((result) => {
          console.log("Inloggad som:", result.user.displayName);
        })
        .catch((error) => {
          console.error("Fel vid inloggning:", error);
        });
    });
  }
}

// Logga ut
function setupLogoutButton() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      auth.signOut()
        .then(() => {
          console.log("Utloggad!");
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Utloggning misslyckades:", error);
        });
    });
  }
}

// Hämta och rendera spelkvällar
async function fetchSessions() {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();
    const response = await fetch(`${baseUrl}/sessions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const sessions = await response.json();
    renderSessions(sessions);
    setupVoteButtons();
  } catch (error) {
    console.error("Kunde inte hämta spelkvällar:", error);
  }
}

// Rendera spelkvällar
function renderSessions(sessions) {
  const container = document.getElementById('sessionsContainer');
  if (container) {
    container.innerHTML = sessions.map(session => `
      <div class="session-card">
        <h3>${session.title}</h3>
        <p>Deadline: ${session.deadline}</p>
        <button class="vote-button" data-id="${session.id}">Rösta</button>
      </div>
    `).join('');
  }
}

// Hantera röster
function setupVoteButtons() {
  document.querySelectorAll('.vote-button').forEach(button => {
    button.addEventListener('click', async (e) => {
      const sessionId = e.target.dataset.id;
      await voteOnSession(sessionId);
    });
  });
}

// Skicka omröstning
async function voteOnSession(sessionId) {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();
    const response = await fetch(`${baseUrl}/session/${sessionId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: user.uid,
        timeVotes: ['friday_18'],
        gameUpvotes: ['catan']
      })
    });
    const result = await response.json();
    console.log("Omröstning registrerad:", result);
  } catch (error) {
    console.error("Kunde inte registrera omröstning:", error);
  }
}

// Starta appen
fetchConfig();

// Konfiguration av knappar när DOM är laddat
document.addEventListener('DOMContentLoaded', () => {
  setupLoginButton();
  setupLogoutButton();
});

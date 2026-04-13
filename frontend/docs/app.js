let firebaseConfig;
let auth;
let provider;

const baseUrl = window.location.hostname === 'localhost'
  ? "http://localhost:5000"
  : "https://boardgamenights.onrender.com";

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

// Initiera Firebase och konfiguration
function initializeFirebase() {
  if (!firebaseConfig.apiKey) {
    return;
  }

  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  provider = new firebase.auth.GoogleAuthProvider();

  // Hantera omdirigeringen när sidan laddas
  auth.getRedirectResult()
    .then((result) => {
      if (result) {
        const user = result.user;
        console.log("Inloggad användare via omdirigering:", user);
      }
    })
    .catch((error) => {
      console.error("Fel vid omdirigering:", error);
    });

  // Lyssna på autentiseringsstatus
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Användaren är inloggad:", user.displayName || user.email);
      if (window.location.pathname.endsWith("index.html") ||
          window.location.pathname === "/boardgamenights/") {
        window.location.href = "planering.html";
      } else {
        fetchSessions();
      }
    } else {
      console.log("Användaren är utloggad");
      if (!window.location.pathname.endsWith("index.html") &&
          !window.location.pathname.includes("planering.html")) {
        window.location.href = "index.html";
      }
    }
  });

  // Konfigurera knappar efter att Firebase har initierats
  setupButtons();
}

// Konfigurera knappar
function setupButtons() {
  const loginButton = document.getElementById('loginButton');
  if (loginButton) {
    loginButton.onclick = () => {
      auth.signInWithRedirect(provider)
        .catch((error) => {
          console.error("Fel vid inloggning:", error);
        });
    };
  }

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.onclick = () => {
      auth.signOut()
        .then(() => {
          console.log("Utloggad!");
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Utloggning misslyckades:", error);
        });
    };
  }
}

// Hämta och rendera spelkvällar
async function fetchSessions() {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("Ingen användare inloggad.");
      return;
    }

    const token = await user.getIdToken();
    console.log("JWT-token hämtad, hämtar sessions...");

    const response = await fetch(`${baseUrl}/sessions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Fel vid hämtning av sessions:", {
        status: response.status,
        errorText: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const sessions = await response.json();
    console.log("Sessions hämtade:", sessions);
    renderSessions(sessions);
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
    setupVoteButtons();
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
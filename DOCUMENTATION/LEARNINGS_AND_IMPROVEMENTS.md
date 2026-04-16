# Lärdomar och Förbättringar: Board Game Nights Projekt

Detta dokument sammanfattar **lärdomar**, **felsteg** och **förbättringsförslag** från utvecklingen av Board Game Nights-projektet. Målet är att hjälpa dig (och framtida du) att undvika vanliga fallgropar och bygga robustare projekt i framtiden.

---

## 🔹 Vad som gjordes bra

### 1. Projektstruktur
- **Modulär separation**: `backend/` och `frontend/` är en **utmärkt struktur** för skalbarhet.
- **Docker-stöd**: Användning av `docker-compose` för lokal utveckling underlättade miljöhantering.

### 2. Teknikval
- **Flask + Firebase Auth**: Ett **solitt val** för små/medelstora projekt med inloggning.
- **Git**: Versionshantering från start.

### 3. Säkerhet
- **JWT-token**: Korrekt användning för autentisering.
- **CORS-restriktioner**: Även om det orsakade problem, var tanken att begränsa åtkomst rätt.

### 4. Uthållighet
- Löst **CORS**, **teckenkodning**, och **Firebase-integrering** trots utmaningar.

---

## 🔹 Felsteg och Förbättringar

### 1. Projektstruktur och Beroenden
   **Problem**                     | **Förbättring**                                                                 | **Varför?**                                                                 |
 |---------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
 | Frontend i `frontend/`          | Flytta till `client/` eller `web/` för tydligare separation.                  | Standard i många projekt (t.ex. `client/` i MERN-stack).                  |
 | Ingen `package.json`            | Använd `npm`/`yarn` för frontend-beroenden (t.ex. `axios`, `react`).         | Enklare beroendehantering och byggprocess.                               |
 | Manuell Firebase-konfig         | Lägg Firebase-konfig i `.env` (frontend) och hämta via backend.              | Säkrare och enklare att uppdatera.                                         |

### 2. Backend och API-Design
 | **Problem**                     | **Förbättring**                                                                 | **Varför?**                                                                 |
 |---------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
 | CORS-problem                    | Använd `flask-talisman` eller hantera CORS i en proxy (t.ex. Nginx).          | Minskar risk för felkonfiguration.                                         |
 | Hårdkodade routes               | Använd `flask-restful` eller `flask-blueprint` för skalbarhet.                | Enklare att lägga till nya routes.                                        |
 | Ingen OpenAPI/Swagger           | Dokumentera API:et med `flask-swagger-ui`.                                     | Underlättar för andra (och framtida du) att förstå API:et.                 |

### 3. Frontend
 | **Problem**                     | **Förbättring**                                                                 | **Varför?**                                                                 |
 |---------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
 | Vanlig JS istället för React/Vue| Använd ett ramverk (t.ex. React) för större projekt.                         | Bättre struktur, återanvändbara komponenter, och enklare state-hantering. |
 | Ingen byggprocess               | Använd `vite` eller `webpack` för att bundla JS/CSS.                          | Optimerar laddningstider och minifierar kod.                              |
 | Teckenkodningsproblem           | Tvinga alltid `UTF-8` i HTML (`<meta charset="UTF-8">`) och backend-svar.      | Undviker "RÃ¤Ã¶sta"-problem.                                                 |

### 4. Deployment
 | **Problem**                     | **Förbättring**                                                                 | **Varför?**                                                                 |
 |---------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
 | GitHub Pages för frontend       | Använd **Render/Vercel** för frontend om du har en backend.                   | GitHub Pages stödjer inte backend eller dynamisk inloggning.              |
 | Ingen CI/CD                     | Lägg till GitHub Actions för automatiska tester och deployment.               | Minskar manuella fel och underlättar uppdateringar.                       |
 | Miljövariabler i koden          | Använd `.env`-filer + `python-dotenv` (backend) och `vite`-miljövariabler.     | Säkrare och enklare att konfigurerar mellan utveckling/produktion.         |

### 5. Databas och State-Hantering
 | **Problem**                     | **Förbättring**                                                                 | **Varför?**                                                                 |
 |---------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
 | Ingen databas                   | Använd **Firestore** (om du redan använder Firebase) eller **PostgreSQL**.     | För att lagra spelkvällar, omröstningar, och användardata permanent.      |
 | State i vanlig JS               | Använd `React Context` eller `Redux` (om du går till React).                  | Enklare hantering av inloggningsstatus, sessions, etc.                     |

---

## 🔹 Arkitekturförslag för ett nytt projekt

Om du skulle göra om projektet, överväg följande struktur:
boardgamenights/

├── backend/                  # Flask API

│   ├── app.py                # Huvudapp

│   ├── routes/               # Routes (sessions.py, config.py, etc.)

│   ├── models/               # Databasmodeller

│   ├── requirements.txt      # Python-beroenden

│   └── Dockerfile            # Container för backend

│

├── client/                   # Frontend (React/Vue/vanlig JS)

│   ├── public/               # Statiska filer (index.html, etc.)

│   ├── src/                  # Källkod (komponenter, stilar, etc.)

│   │   ├── App.js            # Huvudkomponent

│   │   ├── components/       # Återanvändbara komponenter

│   │   └── styles/           # CSS/SCSS

│   ├── package.json          # Node.js-beroenden

│   ├── vite.config.js        # Byggkonfiguration

│   └── Dockerfile            # Container för frontend (om du vill)

│

├── docker-compose.yml        # Orchestrera backend + frontend

├── .github/workflows/         # GitHub Actions för CI/CD

│   └── deploy.yml

└── README.md
text
Copy





---

## 🔹 Tekniska Rekommendationer för Framtiden

### 1. Frontend
- **Använd React eller Vue** för bättre struktur och state-hantering.
- **Lägg till ESLint/Prettier** för kodkvalitet.
- **Använd `axios`** istället för `fetch` för API-anrop (enklare felhantering).

### 2. Backend
- **Lägg till en databas** (Firestore eller PostgreSQL) för att lagra spelkvällar och omröstningar.
- **Dokumentera API:et** med Swagger/OpenAPI.
- **Använd `flask-restful`** för att organisera routes.

### 3. Deployment
- **Använd Render/Vercel** för frontend och backend.
- **Lägg till CI/CD** med GitHub Actions för automatiska tester och deployment.
- **Separera miljövariabler** för utveckling och produktion.

### 4. Säkerhet
- **Validera alltid JWT-token** i backenden.
- **Använd HTTPS** (Render hanterar detta automatiskt).
- **Sanitera användarinmatning** för att undvika XSS/SQL-injection.

### 5. Testning
- **Lägg till enhetstester** (t.ex. `pytest` för backend, `Jest` för frontend).
- **Testa CORS lokalt** med `cURL` eller Postman innan deployment.

---

## 🔹 Sammanfattning av Lärdomar

| **Lärdom**                          | **Tillämpning i framtida projekt**                          |
|-------------------------------------|----------------------------------------------------------------|
| CORS är krångligt                   | Hantera CORS i en proxy (t.ex. Nginx) eller använd `flask-talisman`. |
| Teckenkodning måste tvingas         | Ange alltid `UTF-8` i HTML och backend-svar.                |
| GitHub Pages passar inte alltid     | Använd Render/Vercel för projekt med backend.               |
| Firebase-konfig bör inte hårdkodas | Hämta den från backenden eller `.env`.                      |
| Dokumentation är viktigt           | Använd Swagger och kommentarer i koden.                     |

---

## 🔹 Slutliga Tips för Ditt Nuvarande Projekt

1. **Fixa CORS permanent**:
   - Använd `flask-talisman` eller konfigurera Nginx som omvänd proxy för att hantera CORS.

2. **Lägg till en databas**:
   - Använd Firestore för att lagra spelkvällar och omröstningar.

3. **Flytta till React**:
   - Om frontenden växer, överväg att migrera till React för bättre struktur.

4. **Automatisera deployment**:
   - Lägg till GitHub Actions för att köra tester och deploya till Render automatiskt.


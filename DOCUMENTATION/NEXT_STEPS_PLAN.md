# Nästa steg för Board Game Nights-projektet

Detta dokument beskriver potentiella nästa steg för att förbättra och utöka projektet baserat på tidigare lärdomar och preferenser.

---

## 🎯 Mål och Prioriteringar

### 1. **Kortsiktiga mål (1-2 veckor)**
- **Fixa CORS-problem permanent**: Använd `flask-talisman` eller konfigurera en omvänd proxy (t.ex. Nginx) för att hantera CORS på ett robust sätt.
- **Lägg till en databas**: Integrera Firestore eller PostgreSQL för att lagra spelkvällar, omröstningar och användardata.
- **Migrera frontend till React**: Byt ut den nuvarande vanliga JavaScript-frontenden mot React för bättre struktur och state-hantering.

### 2. **Mellansiktiga mål (2-4 veckor)**
- **Automatisera deployment**: Lägg till CI/CD med GitHub Actions för automatiska tester och deployment till Render.
- **Dokumentera API:et**: Använd Swagger/OpenAPI för att dokumentera backend-API:et.
- **Lägg till enhetstester**: Implementera `pytest` för backend och `Jest` för frontend.

### 3. **Långsiktiga mål (1-3 månader)**
- **Utöka funktioner**: Lägg till funktioner som:
  - Användarprofiler med spelhistorik.
  - Omröstningar för att välja spel.
  - Kalenderintegrering för att schemalägga spelkvällar.
- **Förbättra säkerheten**: Implementera ytterligare säkerhetsåtgärder som input-sanering och HTTPS.
- **Optimeringsarbete**: Förbättra laddningstider och användarupplevelse.

---

## 📋 Detaljerad Plan

### 1. **Fixa CORS-problem**
- **Åtgärd**: Installera och konfigurera `flask-talisman` i backend-projektet.
- **Förväntat resultat**: CORS-problem löst permanent utan manuell konfiguration.
- **Resurser**:
  - [Flask-Talisman-dokumentation](https://flask-talisman.readthedocs.io/)

### 2. **Lägg till en databas**
- **Åtgärd**: Integrera Firestore eller PostgreSQL för datalagring.
- **Förväntat resultat**: Spelkvällar, omröstningar och användardata lagras permanent.
- **Resurser**:
  - [Firestore-dokumentation](https://firebase.google.com/docs/firestore)
  - [SQLAlchemy för PostgreSQL](https://www.sqlalchemy.org/)

### 3. **Migrera frontend till React**
- **Åtgärd**: Skapa en ny React-baserad frontend med TypeScript.
- **Förväntat resultat**: Bättre struktur, återanvändbara komponenter och enklare state-hantering.
- **Resurser**:
  - [React-dokumentation](https://react.dev/)
  - [TypeScript-dokumentation](https://www.typescriptlang.org/)

### 4. **Automatisera deployment**
- **Åtgärd**: Lägg till GitHub Actions för CI/CD.
- **Förväntat resultat**: Automatiska tester och deployment till Render.
- **Resurser**:
  - [GitHub Actions-dokumentation](https://docs.github.com/en/actions)

### 5. **Dokumentera API:et**
- **Åtgärd**: Använd Swagger/OpenAPI för att dokumentera backend-API:et.
- **Förväntat resultat**: Bättre förståelse och underhåll av API:et.
- **Resurser**:
  - [Swagger-dokumentation](https://swagger.io/)

### 6. **Lägg till enhetstester**
- **Åtgärd**: Implementera `pytest` för backend och `Jest` för frontend.
- **Förväntat resultat**: Ökad kodkvalitet och färre buggar.
- **Resurser**:
  - [Pytest-dokumentation](https://docs.pytest.org/)
  - [Jest-dokumentation](https://jestjs.io/)

---

## 🛠 Tekniska Rekommendationer

### Frontend
- **Ramverk**: React med TypeScript.
- **Byggverktyg**: Vite för snabbare byggprocess.
- **State-hantering**: Använd `React Context` eller `Redux` för komplex state.
- **API-anrop**: Använd `axios` istället för `fetch` för enklare felhantering.

### Backend
- **Ramverk**: Flask med `flask-restful` för bättre organisering av routes.
- **Databas**: Firestore för enkel integration med Firebase Auth, eller PostgreSQL för mer komplexa behov.
- **Säkerhet**: Validera alltid JWT-token och sanitera användarinmatning.

### Deployment
- **Hosting**: Render för backend och frontend.
- **CI/CD**: GitHub Actions för automatiska tester och deployment.
- **Miljövariabler**: Använd `.env`-filer och `python-dotenv` för säker konfiguration.

---

## 📅 Tidsplan

| **Steg**                     | **Tidsuppskattning** | **Prioritet** |
|------------------------------|----------------------|---------------|
| Fixa CORS-problem             | 1-2 dagar            | Hög           |
| Lägg till en databas          | 3-5 dagar            | Hög           |
| Migrera frontend till React   | 5-7 dagar            | Medium        |
| Automatisera deployment       | 2-3 dagar            | Medium        |
| Dokumentera API:et            | 1-2 dagar            | Låg           |
| Lägg till enhetstester        | 3-5 dagar            | Medium        |

---

## 📝 Sammanfattning

Genom att följa denna plan kan projektet förbättras avsevärt både tekniskt och funktionellt. Prioritera de kortsiktiga målen för att snabbt få en stabil och skalbar grund att bygga vidare på.
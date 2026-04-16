# Setup för React med TypeScript

Detta dokument beskriver hur du ställer in en React-baserad frontend med TypeScript för Board Game Nights-projektet.

---

## 🔹 Förutsättningar

Innan du börjar, se till att du har följande installerat:
- [Node.js](https://nodejs.org/) (version 16 eller senare)
- [npm](https://www.npmjs.com/) eller [yarn](https://yarnpkg.com/)

---

## 🔹 Skapa ett nytt React-projekt med TypeScript

### 1. Skapa projektet

Använd `create-react-app` med TypeScript-template för att skapa ett nytt projekt:

```bash
npx create-react-app client --template typescript
```

Eller om du föredrar att använda `yarn`:

```bash
yarn create react-app client --template typescript
```

### 2. Navigera till projektkatalogen

```bash
cd client
```

---

## 🔹 Projektstruktur

Efter att ha skapat projektet, kommer strukturen att se ut ungefär så här:

```plaintext
client/
├── node_modules/          # NPM-beroenden
├── public/                # Statiska filer
│   ├── index.html         # Huvud-HTML-fil
│   ├── favicon.ico        # Favicon
│   ├── logo192.png        # Logga
│   ├── logo512.png        # Logga
│   ├── manifest.json      # Manifest-fil
│   └── robots.txt         # Robots-fil
├── src/                   # Källkod
│   ├── App.css            # CSS för App-komponenten
│   ├── App.tsx            # Huvudkomponent
│   ├── App.test.tsx       # Tester för App-komponenten
│   ├── index.css          # Global CSS
│   ├── index.tsx          # Startpunkt för applikationen
│   ├── logo.svg           # Logga
│   ├── react-app-env.d.ts # TypeScript-deklarationer
│   └── setupTests.ts      # Konfiguration för tester
├── .gitignore             # Git-ignore-fil
├── package.json           # NPM-konfiguration
├── tsconfig.json          # TypeScript-konfiguration
└── README.md              # Dokumentation
```

---

## 🔹 Installera ytterligare beroenden

För att förbättra utvecklingsupplevelsen och lägga till nödvändiga funktioner, installera följande paket:

### 1. Installera `axios` för API-anrop

```bash
npm install axios
```

### 2. Installera `react-router-dom` för routing

```bash
npm install react-router-dom
```

### 3. Installera `react-icons` för ikoner

```bash
npm install react-icons
```

### 4. Installera `sass` för avancerad CSS (valfritt)

```bash
npm install sass
```

---

## 🔹 Konfigurera TypeScript

### 1. Öppna `tsconfig.json`

Se till att följande inställningar är konfigurerade:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## 🔹 Skapa grundläggande komponenter

### 1. Skapa en `components`-katalog

```bash
mkdir -p src/components
```

### 2. Skapa en `pages`-katalog

```bash
mkdir -p src/pages
```

### 3. Skapa en `styles`-katalog

```bash
mkdir -p src/styles
```

---

## 🔹 Exempel på en enkel komponent

### 1. Skapa en `Header.tsx`-fil

```tsx
// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
```

### 2. Använd `Header`-komponenten i `App.tsx`

```tsx
// src/App.tsx
import React from 'react';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header title="Board Game Nights" />
      <main>
        <p>Välkommen till Board Game Nights!</p>
      </main>
    </div>
  );
};

export default App;
```

---

## 🔹 Konfigurera routing

### 1. Skapa en `Router`-komponent

```tsx
// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
```

### 2. Uppdatera `App.tsx` för att använda `AppRouter`

```tsx
// src/App.tsx
import React from 'react';
import AppRouter from './Routes';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
```

---

## 🔹 Anslut till backend-API

### 1. Skapa en `api`-katalog

```bash
mkdir -p src/api
```

### 2. Skapa en `api`-fil för att hantera API-anrop

```tsx
// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Ersätt med din backend-URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### 3. Använd `api` i en komponent

```tsx
// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface GameNight {
  id: number;
  title: string;
  date: string;
}

const Home: React.FC = () => {
  const [gameNights, setGameNights] = useState<GameNight[]>([]);

  useEffect(() => {
    const fetchGameNights = async () => {
      try {
        const response = await api.get<GameNight[]>('/api/game-nights');
        setGameNights(response.data);
      } catch (error) {
        console.error('Error fetching game nights:', error);
      }
    };

    fetchGameNights();
  }, []);

  return (
    <div>
      <h2>Kommande spelkvällar</h2>
      <ul>
        {gameNights.map((gameNight) => (
          <li key={gameNight.id}>
            {gameNight.title} - {gameNight.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
```

---

## 🔹 Kör projektet lokalt

### 1. Starta utvecklingsservern

```bash
npm start
```

Eller om du använder `yarn`:

```bash
yarn start
```

### 2. Öppna webbläsaren

Öppna [http://localhost:3000](http://localhost:3000) för att se din applikation.

---

## 🔹 Bygg för produktion

### 1. Bygg projektet

```bash
npm run build
```

Eller om du använder `yarn`:

```bash
yarn build
```

### 2. Testa den byggda versionen

```bash
npm install -g serve
serve -s build
```

---

## 🔹 Deployment till Render

### 1. Skapa ett nytt statiskt webbplatser-projekt på Render

1. Logga in på [Render](https://render.com/).
2. Klicka på "New" och välj "Static Site".
3. Anslut ditt GitHub-repo.
4. Ange följande inställningar:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

### 2. Deploya

Klicka på "Create Static Site" för att starta deployment.

---

## 📝 Sammanfattning

Genom att följa dessa steg har du nu en React-baserad frontend med TypeScript som är redo att integreras med din Flask-backend. Nästa steg är att fortsätta bygga ut funktioner och se till att frontend och backend kommunicerar smidigt.
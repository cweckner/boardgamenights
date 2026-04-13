# Board Game Nights – Local Development Setup

This guide explains how to set up and run the Board Game Nights project locally using Docker.

## Prerequisites

- Docker (with Docker Compose)
- Git
- A .env file with Firebase credentials (see .env.example)

## Project Structure

```
boardgamenights/
├── backend/            # Flask backend
│   ├── app.py          # Main Flask app
│   ├── config/         # Firebase config
│   ├── routes/         # API routes
│   └── Dockerfile      # Docker config for backend
├── frontend/           # Frontend (static files)
├── docker-compose.yml  # Docker Compose config
└── .env                # Environment variables (gitignored)
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/boardgamenights.git
cd boardgamenights
```

### 2. Configure Environment Variables

Copy .env.example to .env and fill in your Firebase credentials:

```bash
cp .env.example .env
```

> **Note:** Never commit .env to Git!

### 3. Set Up Firebase Config Files

Place your Firebase service account JSON file in:

```
configs/boardgamenights-firebase-adminsdk-fbsvc-701662694d.json
```

> **Note:** This directory is .gitignored.

### 4. Build and Start the Containers

```bash
docker-compose build   # Build the images
docker-compose up      # Start the containers
```

Use `docker-compose up -d` to run in detached mode.

## Accessing the Application

### Backend API: http://localhost:5000

- `/config` – Firebase configuration (no auth required)
- `/sessions` – Authenticated sessions (requires JWT)

### Frontend: http://localhost:5500

## Testing the API

### 1. Test /config

```bash
curl http://localhost:5000/config/
```

Should return Firebase config.

### 2. Test /sessions (with JWT)

```bash
curl -X GET http://localhost:5000/sessions/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Origin: http://localhost:5500"
```

Replace `YOUR_JWT_TOKEN` with a valid Firebase JWT.

## Troubleshooting

### 1. CORS Issues

If you see CORS errors:

- Ensure http://localhost:5500 is in CORS allowed origins
- Check that Authorization header is allowed

### 2. Permission Issues (Fedora/SELinux)

Run:

```bash
sudo chcon -Rt svirt_sandbox_file_t backend/ .env configs/
```

### 3. Docker Logs

Check backend logs:

```bash
docker-compose logs backend
```

## Stopping the Application

```bash
docker-compose down
```

## Notes

- **Firebase Emulator:** For local testing, consider using the Firebase Emulator Suite.
- **Environment Variables:** Never commit .env or configs/ to Git.
- **Production:** For deployment (e.g., Render), set environment variables directly in the hosting provider.

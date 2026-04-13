# Använder officiell Python-avbildning
FROM python:3.11-slim

# Sätter arbetsmappen
WORKDIR /app

# Kopierar och installerar beroenden
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopierar resten av appen
COPY . .

# Kör som root (för att undvika behörighetsproblem på Fedora/SELinux)
USER 0

# Kör Gunicorn utan HTTPS-omdirigering
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--proxy-protocol", "--forwarded-allow-ips", "*", "app:app"]





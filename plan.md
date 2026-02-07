# BrädSpelsKompisar (BSK)


## Problemformulering
1. Det är svårt att hitta tider då folk kan
2. Svårt att välja spel


## Användarflöde
1. En spelare lägger fram en proposition med:
 - Förslag på datum, och eventuellt tider
 - Förslag på spel (öppet eller stängt för tillägg)
 - Om spelaren kan vara värd
 - Omröstningsdeadline

2. De andra spelarna får ett mejl med förslaget, samt en länk till planeringssidan, där man kan
 - Välja datum som fungerar
 - Anpassa tider
 - Tumma upp spel, eller lägga till egna
 - Erbjuda värdskap vid behov
 - Lägga till kommentarer

3. När alla spelare antingen har röstat, eller deadlinen uppnåtts, väljs det "bästa" förslaget ut, och en kalenderinbjudan skickas ut.



## MVP


## Tech Stack 

### Backend
Flask [Python]

### Frontend
React [JavaScript / TypeScript]

### Databas
Firebase

### Hosting
 - FE: Github Pages
 - BE: Heroku

### Mail
Notemailer + FlaskMail


# TradeMatrix Backend

## Google OAuth2

The backend now contains the complete Google OAuth2 callback flow.

Configure:

```powershell
$env:GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
$env:GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
```

Then run:

```powershell
mvn spring-boot:run
```

Google redirect URI:

```text
http://localhost:8080/login/oauth2/code/google
```

Frontend callback:

```text
http://localhost:5173/auth/callback
```

Google users are currently stored in the development in-memory AuthStore. They will disappear when the backend restarts. PostgreSQL persistence is the next database step.

Never commit the Google client secret to Git or place it in frontend code.


## Build fix

`AuthController` includes the required `ResponseStatusException` import.

## Run

```powershell
mvn spring-boot:run
```

or, when Maven is available on PATH:

```powershell
.\mvnw.cmd spring-boot:run
```

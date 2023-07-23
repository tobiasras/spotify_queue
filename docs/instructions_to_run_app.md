# To run the program

## Perequisites to run the program
1. Have node installed
2. Have nodemon installed : https://www.npmjs.com/package/nodemon
3. Have the .env file, see more under server and client:


### Server
Have a .env file in root of the server folder with:
1. SPOTIFY_CLIENT_ID='id'
2. SPOTIFY_CLIENT_SECRET='secret'
3. SPOTIFY_CLIENT_CALLBACK_URL='http://localhost:8080/auth/callback'

To run the server:
``` shell
npm start
```
To run the server in dev mode:
``` shell
npm run dev
```
### Client
Have a .env file in root of the client folder with:
1. REACT_APP_SERVER_URL=http://localhost:8080

**id and secret** can be found in the spotify dev account settings

Either create your own spotify dev account -> https://developer.spotify.com/documentation/web-api or ask Tobiasras for it.

Then the application should be ready to run.

To run the client:
``` shell
npm start
```
To run the client in dev mode:
``` shell
npm run dev
```
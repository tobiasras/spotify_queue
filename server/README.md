# To run the program

## Perequisites to run the program
1. Have node installed
2. Have nodemon installed : https://www.npmjs.com/package/nodemon

have a .env file in root of projects with:
1. SPOTIFY_CLIENT_ID='id'
2. SPOTIFY_CLIENT_SECRET='secret'
3. SPOTIFY_CLIENT_CALLBACK_URL='http://localhost:8080/auth/callback'

**id and secret** can be found in the spotify dev account settings

Either create your own spotify dev account -> 
https://developer.spotify.com/documentation/web-api

or ask Tobiasras for it.

Then the application should be ready to run

``` shell
npm start
```

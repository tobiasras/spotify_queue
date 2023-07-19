import express from "express";
import path from "path";
import querystring from "querystring";
import {fetchSpotifyToken} from "../authentication/fetchSpotifyToken.js";
import db from "../../database/mongodb.js";

export const devmode = (app) => {
    app.use(express.static("/public"))
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('public/index.html'))
    })

    // AUTHENTICATION
    app.get('/auth/login/devmode', function (req, res) {
        const redirectLink = 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: 'user-modify-playback-state ' + 'user-read-private ' + 'user-read-email ' + 'user-read-playback-state',
                redirect_uri: 'http://localhost:8080/auth/callback/test'
            })

        res.redirect(redirectLink)
    })

    app.get('/auth/callback/test', async (req, res) => {
        const code = req.query.code || null
        const requestTokenInfo = new URLSearchParams()

        requestTokenInfo.append('grant_type', 'authorization_code')
        requestTokenInfo.append('code', code)
        requestTokenInfo.append('redirect_uri', 'http://localhost:8080/auth/callback/test')

        const token = await fetchSpotifyToken(requestTokenInfo)
        token.username = process.env.USERNAME
        token.creationTime = new Date()

        try {
            await db.spotifyAccess.insertOne(token)
            res.redirect(`http://localhost:8080/?${JSON.stringify(token)}`)
        } catch (e) {
            res.redirect(`http://localhost:8080?${e}`)
        }
    })
}

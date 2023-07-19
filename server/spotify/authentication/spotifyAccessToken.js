import db from "../../database/mongodb.js";
import {fetchSpotifyToken} from "./fetchSpotifyToken.js";

let accessToken
let refreshToken
let expiresIn
let createdAt

export async function getAccessToken() {
    return new Promise(async (resolve, reject) => {
        if (!accessToken) {
            reject("not logged in")
        }

        if (isTokenExpired()) {
            await requestTokenWithRefreshToken()

            try {
                await db.spotifyAccess.updateOne({username: process.env.USERNAME},
                    {$set: { access_token: accessToken, creationTime: new Date() } })
            } catch (e) {
                reject("could update token to database" + e)
            }

            resolve(accessToken)
        } else {
            resolve(accessToken)
        }
    })
}

export function isLoggedIn() {
    return !!accessToken;
}

/**
 * Checks database if a token exist in database
 */
export async function checkIfLoggedInBefore() {
    const token = await db.spotifyAccess.findOne({username: process.env.USERNAME})

    if (token) {
        setValues(token)
        return true
    } else {
        return false
    }
}

function isTokenExpired() {
    return new Date().getTime() > createdAt.getTime() + expiresIn * 60;
}

async function requestTokenWithRefreshToken() {
    const body = new URLSearchParams()
    body.append('grant_type', 'refresh_token')
    body.append('refresh_token', refreshToken)
    const token = await fetchSpotifyToken(body)
    setValues(token)
}

function setValues(token) {
    accessToken = token.access_token
    refreshToken = token.refresh_token
    expiresIn = token.expires_in
    createdAt = new Date(token.creationTime)
}

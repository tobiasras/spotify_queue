import db from "../../database/mongodb.js";
import {fetchSpotifyToken} from "./fetchSpotifyToken.js";

let accessToken
let refreshToken
let expiresIn
let createdAt


/**
 * USED WHEN LOGGING OUT OF A SPOTIFY ACCOUNT
 */
export function clearToken() {
    accessToken = null
    refreshToken = null
    expiresIn = null
    createdAt = null
}

export async function getAccessToken() {
    return new Promise(async (resolve, reject) => {
        if (!accessToken) {
            reject("not logged in")
            return
        }

        if (isTokenExpired()) {
            await requestTokenWithRefreshToken()
            try {
                await db.spotifyAccess.updateOne({username: process.env.USER_PROFILE},
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

/**
 * Checks database if a token exist in database
 */

export async function checkIfLoggedInBefore() {

    const token = await db.spotifyAccess.findOne({username: process.env.USER_PROFILE})

    if (token) {
        setSpotifyTokensValues(token)
        return true
    } else {
        return false
    }
}

function isTokenExpired() {
    try {
        return new Date().getTime() > createdAt.getTime() + expiresIn * 60;
    } catch {
        return null
    }
}

async function requestTokenWithRefreshToken() {
    const body = new URLSearchParams()
    body.append('grant_type', 'refresh_token')
    body.append('refresh_token', refreshToken)
    const token = await fetchSpotifyToken(body)
    setSpotifyTokensValues(token)
}

export function setSpotifyTokensValues(token) {
    accessToken = token.access_token
    refreshToken = token.refresh_token
    expiresIn = token.expires_in
    createdAt = new Date(token.creationTime)
}

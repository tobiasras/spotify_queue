import * as dotenv from 'dotenv'
dotenv.config()

const spotifyToken = async (body) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // eslint-disable-next-line new-cap
      Authorization: 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    body
  })
  return response.json()
}

export default spotifyToken

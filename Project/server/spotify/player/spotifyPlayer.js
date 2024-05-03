/**
 * spotifyPlayer.js handles all spotify request about songs, queue and commands to the playback device.
 * created by @Tobiasras
 * 21-06-2023
 */

import { getAccessToken } from '../authentication/spotifyAccessToken.js'
import { filterTrackObject } from '../filters/trackObjectFilter.js'

/**
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 *
 * Docs. https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
 */
export const state = async () => {
  let token
  try {
    token = await getAccessToken()
  } catch (e) {
    return
  }

  const response = await fetch('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  if (response.status !== 200) {
    return null
  } else {
    const result = await response.json()

    return {
      track: filterTrackObject(result.item),
      is_playing: result.is_playing
    }
  }
}

/**
 * Add an item to the end of the user's current playback queue.
 *
 * Docs. https://developer.spotify.com/documentation/web-api/reference/add-to-queue
 */
export const addSong = async (trackUri) => {
  let token

  try {
    token = await getAccessToken()
  } catch (e) {
    return
  }

  const response = await fetch('https://api.spotify.com/v1/me/player/queue/?uri=' + trackUri, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  return response.status
}

/**
 * Pause playback on the user's account.
 *
 * Docs. https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
 */
export const pause = async () => {
  let token

  try {
    token = await getAccessToken()
  } catch (e) {
    return
  }

  const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  return response.status
}

/**
 * Start a new context or resume current playback on the user's active device.
 *
 * Docs. https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
 */
export const play = async () => {
  let token

  try {
    token = await getAccessToken()
  } catch (e) {
    return
  }

  const response = await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  return response.status
}

/**
 * Skips to previous track in the user’s queue.
 *
 * Docs. https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
 */
export const previous = async () => {
  let token

  try {
    token = await getAccessToken()
  } catch (e) {
    return
  }

  const response = fetch('https://api.spotify.com/v1/me/player/previous', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  return response.status
}

/**
 * Skips to next track in the user’s queue.
 * Docs: https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
 */
export const next = async () => {
  let token

  try {
    token = await getAccessToken()
  } catch (e) {
    return
  }

  const response = await fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }

  })

  return response.status
}

export default {
  next,
  previous,
  play,
  pause,
  addSong,
  state
}

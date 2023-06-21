// This method takes spotify track object and returns the usefull parts

export function filterQueue (queue) {
  return queue.map(trackObject => {
    return filterTrackObject(trackObject)
  })
}

export function filterTrackObject (trackObject) {
  const track = {
    id: trackObject.id,
    name: trackObject.name,
    images: trackObject.album.images,
    href: trackObject.external_urls,
    artists: trackObject.artists,
    uri: trackObject.uri,
    preview_url: trackObject.preview_url,
    duration_ms: trackObject.duration_ms
  }

  return track
}

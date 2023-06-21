export default function sendMessageByStatus (result, res) {
  switch (result.status) {
    case 204:
      res.status(204)
      res.send({ message: 'Command sent' })
      break
    case 400:
      res.status(401)
      res.send({ message: 'Bad request' })
      break
    case 401:
      res.status(401)
      res.send({ message: 'Bad or expired token' })
      break
    case 403:
      res.status(403)
      res.send({ message: 'Bad OAuth request' })
      break
    case 429:
      res.status(429)
      res.send({ message: 'App has exceeded its rate limits' })
      break
    case 404:
      res.status(404)
      res.send({ message: 'Endpoint not found' })
  }
}

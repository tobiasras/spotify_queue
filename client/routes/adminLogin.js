
import express from 'express'

const routerAdmin = express.Router()

routerAdmin.get('/:password', (req, res) => {
  res.send(JSON.stringify({ hello: 'hello from backend' }))
})

export default routerAdmin

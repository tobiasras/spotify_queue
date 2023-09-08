import express from 'express'
import bcrypt from "bcrypt";
import log from "../logger/logger.js";

const routerAdmin = express.Router()

const saltRounds = 6;
const myPlaintextPassword = process.env.SECRET_KEY

routerAdmin.get('/api/admin/:password', (req, res) => {
    log.info({label: "Admin login", message: `login try`})

    if (req.params.password === process.env.SECRET_PASSWORD){
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            res.send({"token": hash})
        })
    } else {
        res.sendStatus(400)
    }
})

export default routerAdmin

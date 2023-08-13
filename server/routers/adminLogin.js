import express from 'express'
import bcrypt from "bcrypt";

const routerAdmin = express.Router()

const saltRounds = 10;
const myPlaintextPassword = process.env.SECRET_KEY


routerAdmin.get('/:password', (req, res) => {
    if (req.params.password === process.env.SECRET_PASSWORD){
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            console.log(hash)
            res.send({"token": hash})
        })
    } else {
        res.sendStatus(400)
    }
})

export default routerAdmin

import bcrypt from "bcrypt";


export async function authenticateSecret (req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    const result = await bcrypt.compare(process.env.SECRET_KEY, token)
    if (!result) {
        return res.status(401).send({ message: 'could not authenticate user' })
    }

    next()
}

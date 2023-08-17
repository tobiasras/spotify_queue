import dotenv from 'dotenv'

const isDevMode = process.argv.indexOf('production') !== -1

if (isDevMode){
    dotenv.config({path: '../.env'})
} else {
    dotenv.config({path: './.env'})
}

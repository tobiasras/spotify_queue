import dotenv from 'dotenv'
import log from '../logger/logger.js'

const isProduction = process.argv.indexOf('production') !== -1

log.info({ label: 'startup', message: `is production: ${isProduction}` })

if (isProduction) {
  dotenv.config({ path: '../.env' })
} else {
  dotenv.config({ path: '../.env' })
}

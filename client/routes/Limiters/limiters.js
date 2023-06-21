import rateLimit from 'express-rate-limit'

export function createLimiter (windowsMinutes, max) {
  return rateLimit({ // 5 request every 15 min
    windowMs: max * 60 * 1000, // 15 minutes
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'To many request'
  })
}

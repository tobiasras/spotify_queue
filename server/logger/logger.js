import winston from 'winston';
import moment from 'moment-timezone';

const localTimezone = 'Europe/Copenhagen';

const log = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format((info) => {
            info.label = info.label || '';
            return info;
        })(),
        winston.format.colorize(),
        winston.format.printf(({level, message, label}) => {
            const timestamp = moment().tz(localTimezone).format('YYYY-MM-DD HH:mm:ss');
            return `${timestamp} [${label}] ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console()
    ]
});

export default log;

import config from 'config'
import { config as winstonConfig, createLogger, transports } from 'winston'

const errorFile = config.get('log.other.errorFile')
const normalFile = config.get('log.other.normalFile')
const normalLevel = config.get('log.other.normalLevel')

const logSinks = [
  new transports.Console(),
  new transports.File({ name: 'error', filename: errorFile, level: 'error' }),
  new transports.File({ name: 'normal', filename: normalFile, level: normalLevel })
]

export default createLogger({
  levels: winstonConfig.syslog.levels,
  transports: [ ...logSinks ]
})

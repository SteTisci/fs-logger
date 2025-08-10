import { Levels, LogMessage } from "./types"

export function getTime() : string {
  return new Date()
    .toLocaleString(undefined, {
      hour12: false,
    })
    .replace(',', '')
}

export function format({ level, message } : LogMessage, levels : Levels, fileFormat: string) : string {
  if (fileFormat === 'text') return `${getTime()} [${levels[level]}] ${message}\n`
  if (fileFormat === 'csv') return `${getTime()},${levels[level]},${message}\n`
  if (fileFormat === 'json') return JSON.stringify({timeStamp: getTime(), level: levels[level], message: message}) + '\n'

  throw new Error(`Cannot format unsupported file type`)
}

export function getFileFormat(filePath : string): string {
  const format = filePath.split('.').pop()

  if(!format) throw new Error('File has no extension')

  if(format === 'txt' || format === 'log' ) return 'text'
  if(format === 'csv') return 'csv'
  if(format === 'json') return 'json'

  throw new Error(`Format .${format} not supported. Use .txt, .log, .json or .csv instead.`)
}
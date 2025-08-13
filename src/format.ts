import path from 'path'
import { Levels, LogMessage } from './types'
import { getTime } from './utils'

const formats: Record<string, string> = {
  txt: 'text',
  log: 'text',
  csv: 'csv',
  jsonl: 'jsonl',
}

const formatters: Record<string, (data: LogMessage, levels: Levels) => string> = {
  text: toText,
  csv: toCsv,
  jsonl: toJson,
}

function toText(data: LogMessage, levels: Levels): string {
  return `${getTime()} [${levels[data.level]}] ${data.message}\n`
}

function toCsv(data: LogMessage, levels: Levels): string {
  return `${getTime()},${levels[data.level]},${data.message}\n`
}

function toJson(data: LogMessage, levels: Levels): string {
  return (
    JSON.stringify({
      timeStamp: getTime(),
      level: levels[data.level],
      message: data.message,
    }) + '\n'
  )
}

export function format(data: LogMessage, levels: Levels, fileFormat: string): string {
  const formatter = formatters[fileFormat]

  if (!formatter) {
    throw new Error(`Cannot format unsupported file type: ${fileFormat}`)
  }

  return formatter(data, levels)
}

export function getFileFormat(filePath: string): string {
  const ext = path.extname(filePath).replace('.', '').toLowerCase()

  if (!ext) {
    throw new Error('File has no extension')
  }

  const format = formats[ext]

  if (!format) {
    throw new Error(`Format .${ext} not supported. Use .txt, .log, .jsonl or .csv instead.`)
  }

  return format
}

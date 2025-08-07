import { Levels, LogMessage } from "./types"

export function getTime() {
  return new Date()
    .toLocaleString(undefined, {
      hour12: false,
    })
    .replace(',', '')
}

export function format({ level, message } : LogMessage, levels : Levels) {
  return `${getTime()} ${levels[level]} ${message}\n`
}

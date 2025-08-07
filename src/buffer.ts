import { Levels, LogMessage } from './types'

export function createBuffer(format: ({level, message}: LogMessage) => string, levels: Levels) {
  return {
    data: [] as string[],

    push({ level, message }: LogMessage) {
      if (!levels[level]) {
        throw new Error(`Invalid log level: ${level}`)
      }
      this.data.push(format({ level, message }))
    },

    flush() {
      this.data = []
    },
  }
}
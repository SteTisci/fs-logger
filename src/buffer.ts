import { LogMessage } from './types'
import { format, getFileFormat } from './utils'
import { levels } from './levels'
import { writeFile } from './fileOps'

export function createBuffer(getPath: () => string) {
  return {
    data: [] as string[],

    push({ level, message }: LogMessage) {
      if (!levels[level]) {
        throw new Error(`Invalid log level: ${level}`)
      }
      this.data.push(format({ level, message }, levels, getFileFormat(getPath())))
    },

    async write(options: { filePath?: string, flush?: boolean } = {}): Promise<void> {
      const { filePath, flush = true } = options
      await writeFile(filePath || getPath(), this.data)
      
      if (flush) this.flush()
    },
    
    flush() {
      this.data = []
    },
  }
}
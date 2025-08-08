import { LogMessage } from './types'
import { format } from './utils'
import { levels } from './levels'
import { writeFile } from './fileOps'

export function createBuffer(getPath: () => string) {
  return {
    data: [] as string[],

    push({ level, message }: LogMessage) {
      if (!levels[level]) {
        throw new Error(`Invalid log level: ${level}`)
      }
      this.data.push(format({ level, message }, levels))
    },

    async write(options: { filePath?: string } = {}): Promise<void> {
      const { filePath } = options
      await writeFile(filePath || getPath(), this.data)
      this.flush()
    },
    
    flush() {
      this.data = []
    },
  }
}
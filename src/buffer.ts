import { LogMessage, Buffer } from './types'
import { format, getFileFormat } from './format'
import { levels } from './levels'
import { writeFile } from './fileOps'

export function createBuffer(getPath: () => string): Buffer {
  return {
    data: [] as string[],

    push({ level, message }: LogMessage): void {
      if (!levels[level]) {
        throw new Error(`Invalid log level: ${level}`)
      }

      this.data.push(format({ level, message }, levels, getFileFormat(getPath())))
    },

    async write(
      options: { filePath?: string; flush?: boolean; append?: boolean } = {},
    ): Promise<void> {
      const { filePath, flush = true, append = true } = options

      await writeFile(filePath || getPath(), this.data, append)

      if (flush) {
        this.flush()
      }
    },

    flush(): void {
      this.data = []
    },
  }
}

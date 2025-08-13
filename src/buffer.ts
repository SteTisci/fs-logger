import { LogMessage, Buffer } from './types'
import { format, getFileFormat } from './format'
import { levels } from './levels'
import { writeFile } from './fileOps'

export function createBuffer(getPath: () => string): Buffer {
  return {
    data: [] as string[],

    push(log: LogMessage): void {
      if (!levels[log.level]) {
        throw new Error(`Invalid log level: ${log.level}`)
      }

      this.data.push(format(log, levels, getFileFormat(getPath())))
    },

    async write(
      filePath?: string,
      options: { flush?: boolean; append?: boolean } = {},
    ): Promise<void> {
      const { flush = true, append = true } = options

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

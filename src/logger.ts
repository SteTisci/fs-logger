import { createBuffer } from './buffer'
import { createFile, writeFile, readFile, removeFile, fileExists } from './fileOps'
import { format, getFileFormat } from './format'
import { levels } from './levels'
import { FileLogger, LogMessage } from './types'

export function createFileLogger(initialPath: string): FileLogger {
  const FILE_PATH = { value: initialPath }

  function definePath(filePath: string): void {
    FILE_PATH.value = filePath
  }

  async function create(filePath?: string, options: { overwrite?: boolean } = {}): Promise<void> {
    const { overwrite = true } = options

    await createFile(filePath || FILE_PATH.value, overwrite)
  }

  async function write(
    log: LogMessage,
    filePath?: string,
    options: { append?: boolean } = {},
  ): Promise<void> {
    const { append = true } = options
    const fullPath = filePath || FILE_PATH.value

    await writeFile(fullPath, format(log, levels, getFileFormat(fullPath)), append)
  }

  async function read(filePath?: string): Promise<string | LogMessage[] | []> {
    const fullPath = filePath || FILE_PATH.value

    const content = await readFile(fullPath)

    if (!content.trim()) {
      return []
    }

    if (getFileFormat(fullPath) === 'jsonl') {
      return content
        .trim()
        .split('\n')
        .map(line => JSON.parse(line))
    }

    return content
  }

  async function remove(filePath?: string): Promise<void> {
    const fullPath = filePath || FILE_PATH.value
    await removeFile(fullPath)
  }

  return {
    definePath,
    create,
    write,
    read,
    remove,
    fileExists,
    createBuffer: () => createBuffer(() => FILE_PATH.value),
  }
}

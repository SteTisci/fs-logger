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

  async function create(options: { filePath?: string; overwrite?: boolean } = {}): Promise<void> {
    const { filePath, overwrite = true } = options

    await createFile(filePath || FILE_PATH.value, overwrite)
  }

  async function write(
    { level, message }: LogMessage,
    options: { filePath?: string; append?: boolean } = {},
  ): Promise<void> {
    const { filePath, append = true } = options
    const fullPath = filePath || FILE_PATH.value

    await writeFile(fullPath, format({ message, level }, levels, getFileFormat(fullPath)), append)
  }

  async function read(options: { filePath?: string } = {}): Promise<string | LogMessage[] | null> {
    const { filePath } = options
    const fullPath = filePath || FILE_PATH.value

    const content = await readFile(fullPath)

    if (!content.trim()) {
      return []
    }

    if (getFileFormat(fullPath) === 'jsonl') {
      return content
        .trim()
        .split('\n')
        .map(line => JSON.parse(line) as LogMessage)
    }

    return content
  }

  async function remove(options: { filePath?: string } = {}): Promise<void> {
    const { filePath } = options

    await removeFile(filePath || FILE_PATH.value)
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

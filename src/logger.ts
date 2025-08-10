import { createBuffer } from './buffer.js'
import { createFile, writeFile, readFile, removeFile, fileExists } from './fileOps.js'
import { format, getFileFormat } from './utils.js'
import { levels } from './levels.js'
import { FileLogger, LogMessage } from './types.js'

export function createFileLogger(initialPath: string): FileLogger {
  const FILE_PATH = {value: initialPath}

  function definePath(filePath: string): void {
    FILE_PATH.value = filePath
  }

  async function create(options: {filePath?: string, overwrite?: boolean} = {}): Promise<void> {
    const { filePath, overwrite = true } = options
    await createFile(filePath || FILE_PATH.value, overwrite)
  }

  async function write({ level, message }: LogMessage, options: { filePath?: string } = {}): Promise<void> {
  const { filePath } = options
  const fullPath = filePath || FILE_PATH.value

  await writeFile(fullPath, format({ message, level }, levels, getFileFormat(fullPath)))
}


  async function read(options: { filePath?: string } = {}): Promise<string | object[] | null> {
    const { filePath } = options
    const pathToRead = filePath || FILE_PATH.value

    const content = await readFile(pathToRead)
    const format = getFileFormat(pathToRead)

    if (format === 'jsonl') {
      const lines = content.trim().split('\n').filter(line => line.length > 0)
      const parsedLogs = lines.map(line => JSON.parse(line))
      return parsedLogs
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

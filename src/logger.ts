import { createBuffer } from './buffer.js'
import { createFile, writeFile, readFile, removeFile } from './fileOps.js'
import { format } from './utils.js'
import { levels } from './levels.js'
import { FileLogger, LogMessage } from './types.js'

export function createFileLogger(initialPath = ''): FileLogger {
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
    await writeFile(filePath || FILE_PATH.value, format({message, level}, levels))
  }

  async function read(options: { filePath?: string } = {}): Promise<string | null> {
    const { filePath } = options
    return await readFile(filePath || FILE_PATH.value)
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
    createBuffer: () => createBuffer(() => FILE_PATH.value),
  }
}

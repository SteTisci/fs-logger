import { createBuffer } from './buffer.js'
import { createFile, writeFile, readFile, removeFile } from './fileOps.js'
import { format } from './utils.js'
import { FileLogger, Levels, LogMessage } from './types.js'

export function createFileLogger(initialPath = ''): FileLogger {
  let FILE_PATH = initialPath

  const levels: Levels = {
    INFO: '[INFO]',
    ERROR: '[ERROR]',
    DEBUG: '[DEBUG]',
    WARN: '[WARN]',
    FATAL: '[FATAL]',
    TRACE: '[TRACE]',
  }

  const buffer = createBuffer((msg) => format(msg, levels), levels)

  function definePath(filePath: string): void {
    FILE_PATH = filePath
  }

  async function create(options: {filePath?: string, overwrite?: boolean} = {}): Promise<void> {
    const { filePath = FILE_PATH, overwrite = true } = options
    await createFile(filePath, overwrite)
  }

  
  async function write({ level, message }: LogMessage, options: { filePath?: string } = {}): Promise<void> {
    const { filePath = FILE_PATH } = options
    await writeFile(filePath, format({message, level}, levels))
  }

  async function writeFromBuffer(options: { filePath?: string } = {}): Promise<void> {
    const { filePath = FILE_PATH } = options
    await writeFile(filePath, buffer.data)
    buffer.flush()
  }

  async function read(options: { filePath?: string } = {}): Promise<string | null> {
    const { filePath = FILE_PATH } = options
    return await readFile(filePath)
  }

  async function remove(options: { filePath?: string } = {}): Promise<void> {
    const { filePath = FILE_PATH } = options
    await removeFile(filePath)
  }

  return {
    definePath,
    create,
    write,
    writeFromBuffer,
    read,
    remove,
    buffer,
  }
}

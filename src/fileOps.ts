import fs from 'fs/promises'
import path from 'path'

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

export async function createFile( filePath : string, overwrite = true): Promise<void> {
  if (!filePath) {
    throw new Error('A file path must be defined to create a log file.')
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true })

  const exists = await fileExists(filePath)
  if (exists && !overwrite) {
    return
  }

  await fs.writeFile(filePath, '', 'utf-8')
}

export async function writeFile(filePath: string, data: string | string[]): Promise<void> {
  const message = typeof data === 'string' ? data : data.join('')
  await fs.appendFile(filePath, message, 'utf-8')
}

export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8')
}

export async function removeFile(filePath: string): Promise<void> {
  await fs.rm(filePath)
}

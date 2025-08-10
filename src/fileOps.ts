import fs from 'fs/promises'
import path from 'path'

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(path.resolve(filePath))
    return true
  } catch {
    return false
  }
}

export async function createFile( filePath : string, overwrite = true): Promise<void> {
  const fullPath = path.resolve(filePath)
  
  await fs.mkdir(path.dirname(fullPath), { recursive: true })

  const exists = await fileExists(fullPath)
  if (exists && !overwrite) {
    return
  }

  await fs.writeFile(fullPath, '', 'utf-8')
}

export async function writeFile(filePath: string, data: string | string[]): Promise<void> {
  const message = typeof data === 'string' ? data : data.join('')
  await fs.appendFile(path.resolve(filePath), message, 'utf-8')
}

export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(path.resolve(filePath), 'utf-8')
}

export async function removeFile(filePath: string): Promise<void> {
  await fs.rm(path.resolve(filePath))
}

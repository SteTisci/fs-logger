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
    console.log(`Log file already exists and won't be overwritten: ${filePath}`)
    return
  }

  await fs.writeFile(filePath, '', 'utf-8')
  console.log(`Log file created at: ${filePath}`)
}

export async function writeFile(filePath: string, data: string[]): Promise<void> {
  await fs.appendFile(filePath, data.join(''), 'utf-8')
}

export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8')
}

export async function removeFile(filePath: string): Promise<void> {
  await fs.rm(filePath)
  console.log(`Log file deleted: ${filePath}`)
}

import fs from 'fs/promises'
import path from 'path'

export async function fileExists(filePath: string): Promise<boolean> {
  const fullPath = path.resolve(filePath)

  try {
    await fs.access(fullPath)
    return true
  } catch (err: any) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    return false
  }
}

export async function createFile(filePath: string, overwrite?: boolean): Promise<void> {
  const fullPath = path.resolve(filePath)

  if ((await fileExists(fullPath)) && !overwrite) {
    return
  }

  await fs.mkdir(path.dirname(fullPath), { recursive: true })
  await fs.writeFile(fullPath, '', 'utf-8')
}

export async function readFile(filePath: string): Promise<string> {
  const fullPath = path.resolve(filePath)

  if (!(await fileExists(fullPath))) {
    throw new Error(`Cannot find file at ${fullPath} to read`)
  }

  const fileContent = await fs.readFile(fullPath, 'utf-8')

  return fileContent
}

export async function writeFile(
  filePath: string,
  data: string | string[],
  append?: boolean,
): Promise<void> {
  const fullPath = path.resolve(filePath)

  const dataToWrite = typeof data === 'string' ? data : data.join('')

  append
    ? await fs.appendFile(fullPath, dataToWrite, 'utf-8')
    : await fs.writeFile(fullPath, dataToWrite, 'utf-8')
}

export async function removeFile(filePath: string): Promise<void> {
  const fullPath = path.resolve(filePath)

  if (!(await fileExists(fullPath))) {
    throw new Error(`Cannot find file at ${fullPath} to remove`)
  }

  await fs.rm(fullPath)
}

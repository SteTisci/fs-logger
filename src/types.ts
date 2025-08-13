export type LogLevel = 'INFO' | 'ERROR' | 'DEBUG' | 'WARN' | 'FATAL' | 'TRACE'

export interface Levels {
  INFO: 'INFO'
  TRACE: 'TRACE'
  WARN: 'WARN'
  DEBUG: 'DEBUG'
  ERROR: 'ERROR'
  FATAL: 'FATAL'
}

export interface LogMessage {
  level: LogLevel
  message: string
}

export interface Buffer {
  data: string[]
  push({ level, message }: LogMessage): void
  write(options?: { filePath?: string; flush?: boolean }): Promise<void>
  flush(): void
}

export interface FileLogger {
  definePath(filePath: string): void
  create(options?: { filePath?: string; overwrite?: boolean }): Promise<void>
  write({ level, message }: LogMessage, options?: { filePath?: string }): Promise<void>
  read(options?: { filePath?: string }): Promise<string | object | null>
  remove(options?: { filePath?: string }): Promise<void>
  createBuffer(): Buffer
  fileExists(filePath: string): Promise<boolean>
}

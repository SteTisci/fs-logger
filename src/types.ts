export type LogLevel = 'INFO' | 'ERROR' | 'DEBUG' | 'WARN' | 'FATAL' | 'TRACE'

export interface Levels {
  INFO: '[INFO]',
  TRACE: '[TRACE]'
  WARN: '[WARN]',
  DEBUG: '[DEBUG]',
  ERROR : '[ERROR]',
  FATAL: '[FATAL]',
}

export interface LogMessage {
  level: LogLevel
  message: string
}

export interface FileLogger {
  definePath(filePath: string): void
  create(options?: {filePath?: string, overwrite?: boolean}): Promise<void>
  write({level, message}: LogMessage, options?: { filePath?: string }): Promise<void>
  writeFromBuffer(options?: { filePath?: string }): Promise<void>
  read(options?: { filePath?: string }): Promise<string | null>
  remove(options?: { filePath?: string }): Promise<void>
  buffer: {
    data: string[]
    push({level, message}: LogMessage): void
    flush(): void
  }
}
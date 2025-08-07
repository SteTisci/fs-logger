export type LogLevel = 'INFO' | 'ERROR' | 'DEBUG'

export interface Levels {
  ERROR : '[ERROR]',
  INFO: '[INFO]',
  DEBUG: '[DEBUG]'
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
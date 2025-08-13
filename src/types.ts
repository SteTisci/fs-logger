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
  /**
   * Adds a new log entry to the buffer.
   *
   * @param log - The log entry containing a level and message.
   * @example
   * buffer.push({ level: 'ERROR', message: 'Unable to connect to database' })
   */
  push(log: LogMessage): void
  /**
   * Writes the buffered logs to a file.
   *
   * @param filePath - Optional file path; defaults to the buffer's associated file.
   * @param options.flush - If `true` (default), clears the buffer after writing.
   * @param options.append - If `true` (default), appends to the file instead of overwriting.
   * @example
   * await buffer.write('logs.txt', { flush: true, append: true })
   */
  write(filePath?: string, options?: { flush?: boolean; append?: boolean }): Promise<void>
  /**
   * Clears all stored logs from the buffer without writing them to file.
   */
  flush(): void
}

export interface FileLogger {
  /**
   * Sets the default file path for all log operations.
   *
   * @param filePath - Path to the log file.
   * @example
   * logger.definePath('logs/app.log')
   */
  definePath(filePath: string): void
  /**
   * Creates a new log file (or overwrites if allowed).
   *
   * @param filePath - Optional file path; defaults to the defined path.
   * @param options.overwrite - If `true` (default), overwrites an existing file.
   * @example
   * await logger.create('logs/app.log', { overwrite: false })
   */
  create(filePath?: string, options?: { overwrite?: boolean }): Promise<void>
  /**
   * Writes a single log entry to the file.
   *
   * @param log - The log entry containing a level and message.
   * @param filePath - Optional file path; defaults to the defined path.
   * @param options.append - If `true` (default), appends to the file instead of overwriting.
   * @example
   * await logger.write({ level: 'INFO', message: 'Application started' })
   */
  write(log: LogMessage, filePath?: string, options?: { append?: boolean }): Promise<void>
  /**
   * Reads log contents from a file.
   *
   * If the file is in `.jsonl` format, returns an array of parsed `LogMessage` objects.
   * For `.txt`, `.log`, or `.csv` formats, returns a string.
   *
   * @param filePath - Optional file path; defaults to the defined path.
   * @example
   * const content = await logger.read()
   */
  read(filePath?: string): Promise<string | LogMessage[] | []>
  /**
   * Deletes a log file.
   *
   * @param filePath - Optional file path; defaults to the defined path.
   * @example
   * await logger.remove('logs/old.log')
   */
  remove(filePath?: string): Promise<void>
  /**
   * Creates a new in-memory buffer for batched log writing.
   *
   * @example
   * const buffer = logger.createBuffer()
   * buffer.push({ level: 'DEBUG', message: 'Debugging info' })
   * await buffer.write()
   */
  createBuffer(): Buffer
  /**
   * Checks if a file exists.
   *
   * @param filePath - Path to check.
   * @example
   * const exists = await logger.fileExists('logs/app.log')
   */
  fileExists(filePath: string): Promise<boolean>
}

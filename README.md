# `fs-logger`

A **lightweight** and **flexible** logging utility for Node.js, designed for efficient log file management. 🚀

`fs-logger` uses a buffer-based logging system to optimize disk writes. It supports customizable log levels (`INFO`, `ERROR`, `DEBUG`), timestamped messages, and a **Promise-based API** for full control over log files (creation, reading, writing, and deletion).

---

## ✨ Main Features

-   **Optimized buffer logging**: Groups messages before writing them to disk, reducing I/O operations and improving performance.
-   **Timestamped messages**: Each log is formatted with a local timestamp for accurate traceability.
-   **Customizable log levels**: Filter and manage messages based on their importance (`INFO`, `ERROR`, `DEBUG`).
-   **Promise-based API**: Asynchronous file operations that are easy to handle.
-   **Flexible path management**: Define the log file path per operation or use a default path.

---

## 📦 Installation

Install the package via **npm**:

```bash
npm install @ste_tisci/fs-logger
```

## 🛠️ Usage Examples

### Initialization and Configuration

```typescript
import { createFileLogger } from "@ste_tisci/fs-logger";

// Create a new logger instance with a default log file path
const logger = createFileLogger("logs/app.log");

// Optionally: redefine the path at any time
logger.definePath("logs/custom-app.log");
```

### Logging Messages

Messages are first added to an internal buffer.

```typescript
import { createFileLogger } from "@ste_tisci/fs-logger";

const logger = createFileLogger("logs/app.log");

// Add messages to the buffer
logger.buffer.push({ level: "INFO", message: "Application started successfully." });
logger.buffer.push({ level: "DEBUG", message: "Loading configuration." });
logger.buffer.push({ level: "ERROR", message: "Failed to connect to database." });

// Write the buffered messages to the log file
await logger.write();
```

### Log File Management

The API provides asynchronous methods for full log file control.

```typescript
// Create the file if it doesn't exist (without overwriting if already present)
await logger.create({ overwrite: false });

// Read the content of the log file
const content = await logger.read();
console.log(content);
/*
Output:
7/8/2025 01:25:30 INFO Application started successfully.
7/8/2025 01:25:30 DEBUG Loading configuration.
7/8/2025 01:25:30 ERROR Failed to connect to database.
*/

// Delete the log file
await logger.remove();
```

## 📖 API Reference

### `createFileLogger(initialPath?: string): FileLogger`

Creates a new logger instance.

-   `initialPath` (optional): Default log file path.

### `logger.definePath(filePath: string): void`

Updates the log file path for all future operations.

### `logger.create(options?: { filePath?: string; overwrite?: boolean }): Promise<void>`

Creates a new log file.

-   `options.filePath` (optional): Overrides the default path.
-   `options.overwrite` (optional, default: true): If false, does not overwrite an existing file.

### `logger.write(options?: { filePath?: string }): Promise<void>`

Writes the buffer content to the log file and clears it.

-   `options.filePath` (optional): Overrides the default path.

### `logger.read(options?: { filePath?: string }): Promise<string | null>`

Reads the content of the log file.

-   `options.filePath` (optional): Overrides the default path.
-   **Returns**: A string with the file content or null if the file doesn't exist.

### `logger.remove(options?: { filePath?: string }): Promise<void>`

Deletes the log file.

-   `options.filePath` (optional): Overrides the default path.

## 💾 `logger.buffer` Object

Accessible via `logger.buffer`, this object manages in-memory messages before writing to disk.

### `buffer.data: string[]`

An array containing formatted log messages waiting to be saved.

### `buffer.push(log: { level: LogLevel; message: string }): void`

Adds a new message to the buffer.

-   `log.level`: Log level ('INFO', 'ERROR', or 'DEBUG').
-   `log.message`: The text message.

### `buffer.flush(): void`

Completely clears the buffer. Automatically called after `logger.write()`.

---

## ⚖️ License

MIT © 2025 SteTisci

# `fs-logger`

A **lightweight** and **flexible** logging utility for Node.js, designed for efficient log file management. 🚀

`fs-logger` offers two primary logging methods: an **optimized buffer-based** system for grouping messages and a direct write method for immediate logging. It features a customizable API for log levels, timestamped messages, and full Promise-based control over log file operations.

---

## ✨ Main Features

-   **Optimized buffer logging**: Collects multiple messages in an in-memory buffer before committing them to disk in a single I/O operation, which significantly improves performance for high-volume logging.
-   **Timestamped messages**: Every log entry is automatically formatted with a local timestamp for precise traceability.
-   **Customizable log levels**: Easily filter and manage log messages based on their severity: `INFO`, `TRACE`, `WARN`, `ERROR`, `FATAL` and `DEBUG`.
-   **Promise-based API**: All file operations are asynchronous, providing a clean and modern interface for handling file I/O.
-   **Flexible path management**: Define the log file path per operation or use a persistent default path for an entire logger instance.

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

You can either log messages directly to the file or use a buffer for optimized writing.

```typescript
import { createFileLogger } from "@ste_tisci/fs-logger";

const logger = createFileLogger("logs/app.log");

// Create a buffer instance
const buffer = logger.createBuffer();

// Add messages to the buffer
buffer.push({ level: "INFO", message: "Application started successfully." });
buffer.push({ level: "DEBUG", message: "Loading configuration." });
buffer.push({ level: "ERROR", message: "Failed to connect to database." });

// Write all buffered messages to the log file at once and clear the buffer if flush is set to true (default)
await buffer.write({ flush: true });

// Otherwise clear the buffer manually
await buffer.flush();

// Write a single message directly to the log file without using the buffer
await logger.write({ level: "WARN", message: "Configuration file is missing, using defaults." });
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
7/8/2025 15:25:30 [INFO] Application started successfully.
7/8/2025 15:25:32 [DEBUG] Loading configuration.
7/8/2025 15:25:33 [ERROR] Failed to connect to database.
7/8/2025 15:25:35 [WARN] Configuration file is missing, using defaults.
*/

// Delete the log file
await logger.remove();
```

> [!TIP]
> If the path is defined during `createFileLogger()` call or with `definePath()`, it can be omitted when calling `create()`, `write()`, `read()` and `remove()`.

---

# 📦 Logger API Documentation

## 🗂️ Logger Methods

These are the primary methods available on the object returned by `createFileLogger()`.

| Method               | Parameters                                                                                  | Description                                                                                                            | Return Type               |
| -------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `createFileLogger()` | `initialPath?`: `string`                                                                    | A factory function that creates and returns a new logger instance.                                                     | `string`                  |
| `definePath()`       | `filePath`: `string`                                                                        | Updates the log file path for all subsequent operations performed by this logger instance.                             | `void`                    |
| `fileExists()`       | `filePath`: `string`                                                                        | Checks if a file exists at the specified path.                                                                         | `Promise<boolean>`        |
| `create()`           | `options`: `{ filePath?: string, overwrite?: boolean }`                                     | Creates a new log file at the specified or default path. `overwrite: false` prevents overwriting an existing file.     | `Promise<void>`           |
| `write()`            | `logMessage`: `{ level: LogLevel, message: string }`<br>`options?`: `{ filePath?: string }` | Writes a single, formatted log message directly to the log file, appending it to the end. Does **not** use the buffer. | `Promise<void>`           |
| `read()`             | `options?`: `{ filePath?: string }`                                                         | Reads the content of the log file.                                                                                     | `Promise<string \| null>` |
| `remove()`           | `options?`: `{ filePath?: string }`                                                         | Deletes the log file.                                                                                                  | `Promise<void>`           |

---

## 🧰 Buffer Methods

These methods are available on the `Buffer` object, which is created via `logger.createBuffer()`.

| Method    | Parameters                                           | Description                                                                                                                                                                                                                                                                     | Return Type     |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `push()`  | `log`: `{ level: LogLevel, message: string }`        | Adds a new message to the buffer's `data` array.                                                                                                                                                                                                                                | `void`          |
| `write()` | `options?`: `{ filePath?: string, flush?: boolean }` | Writes the entire buffer content to the log file. By default, the function will flush the buffer immediately after writing the data. To retain the buffer's contents after writing, simply set this option to `false`. This optimized method is designed for efficient logging. | `Promise<void>` |
| `flush()` | _(none)_                                             | Clears the internal `data` array, emptying the buffer. Called automatically by `buffer.write()`.                                                                                                                                                                                | `void`          |

---

> [!NOTE]
> File paths can be absolute or relative, depending on your use case.

## ⚖️ License

MIT © 2025 SteTisci

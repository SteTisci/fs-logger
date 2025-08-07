# `fs-logger`

A **lightweight** and **flexible** logging utility for Node.js, designed for efficient log file management. 🚀

`fs-logger` uses a buffer-based logging system to optimize disk writes. It supports customizable log levels, timestamped messages, and a **Promise-based API** for full control over log files (creation, reading, writing, and deletion).

---

## ✨ Main Features

-   **Optimized buffer logging**: Groups messages before writing them to disk, reducing I/O operations and improving performance.
-   **Timestamped messages**: Each log is formatted with a local timestamp for accurate traceability.
-   **Customizable log levels**: Filter and manage messages based on their importance (`INFO`, `TRACE`, `WARN`, `ERROR`, `FATAL`, `DEBUG`).
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
await logger.writeFromBuffer();

// Write directly to the log file
logger.write({ level: "WARN", message: "Configuration file is missing, using defaults." });
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
7/8/2025 01:25:30 [INFO] Application started successfully.
7/8/2025 01:25:30 [DEBUG] Loading configuration.
7/8/2025 01:25:30 [ERROR] Failed to connect to database.
7/8/2025 01:25:30 [WARN] Configuration file is missing, using defaults.
*/

// Delete the log file
await logger.remove();
```

> [!TIP]
> If the path is defined in the `createFileLogger()` method, it can be omitted when you call `create()`, `write()`, `writeFromBuffer()`, `read()` and `remove()` if you are working with the same file.

---

# 📦 Logger API Documentation

## 🗂️ Logger Methods

This section lists all methods related to logger file creation, writing, reading, and deletion.

| Method               | Parameters                                                                                  | Description                                                                                             | Return Type               |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------- |
| `createFileLogger()` | `initialPath?`: `string`                                                                    | Creates a new logger instance with an optional default log file path.                                   | `string`                  |
| `definePath()`       | `filePath`: `string`                                                                        | Updates the log file path for all future operations.                                                    | `void`                    |
| `create()`           | `options`: `{ filePath?: string, overwrite?: boolean }`                                     | Creates a new log file. If `overwrite` is `false`, it won’t overwrite existing files (default: `true`). | `Promise<void>`           |
| `write()`            | `logMessage`: `{ level: LogLevel, message: string }`<br>`options?`: `{ filePath?: string }` | Writes the message to the buffer, then writes buffer content to the log file and clears it.             | `Promise<void>`           |
| `writeFromBuffer()`  | `options?`: `{ filePath?: string }`                                                         | Writes the entire buffer content to the log file and clears the buffer.                                 | `Promise<void>`           |
| `read()`             | `options?`: `{ filePath?: string }`                                                         | Reads the content of the log file. Returns a string or `null` if the file doesn't exist.                | `Promise<string \| null>` |
| `remove()`           | `options?`: `{ filePath?: string }`                                                         | Deletes the log file.                                                                                   | `Promise<void>`           |

---

## 🧰 Buffer Methods

These methods allow you to manage the internal message buffer before writing to file.

| Property / Method | Parameters                                    | Description                                                                   | Return Type |
| ----------------- | --------------------------------------------- | ----------------------------------------------------------------------------- | ----------- |
| `buffer.data`     | _(none)_                                      | Array of formatted log messages waiting to be saved.                          | `string[]`  |
| `buffer.push()`   | `log`: `{ level: LogLevel, message: string }` | Adds a new message to the buffer.                                             | `void`      |
| `buffer.flush()`  | _(none)_                                      | Clears the buffer completely. Called automatically after `writeFromBuffer()`. | `void`      |

---

> [!NOTE]
> File paths can be absolute or relative, depending on your use case.

## ⚖️ License

MIT © 2025 SteTisci

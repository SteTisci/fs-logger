export function getTime(): string {
  return new Date()
    .toLocaleString(undefined, {
      hour12: false,
    })
    .replace(',', '')
}

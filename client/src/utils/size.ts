export function bytesToSize(bytes: number | string): string {
  bytes = +bytes
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  if (bytes == 0) return "0 B"
  const i = parseInt("" + Math.floor(Math.log(bytes) / Math.log(1024)))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i]
}

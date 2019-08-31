export const getFormatDate = (rawDate = ""): string => {
  const itemArr = new Date(rawDate).toString().split(" ")
  const m = itemArr[1]
  const d = itemArr[2]
  const y = itemArr[3]
  return `${m} ${d}, ${y}`
}

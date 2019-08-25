import { LanguageParams } from "../pages/trending/index"
import Taro from "@tarojs/taro"

interface GlobalData {
  myLangs: LanguageParams[]
  // [key: string]: string
}
type globalDataKey = keyof GlobalData

const defaultLangs = [
  {
    language: "java",
    title: "Java"
  },
  {
    language: "javascript",
    title: "JavaScript"
  },
  {
    language: "typescript",
    title: "TypeScript"
  }
]

const globalData: GlobalData = {
  myLangs: Taro.getStorageSync("myLangs") || defaultLangs
}

export const setGlobalData = (key: globalDataKey, val: any) => {
  globalData[key] = val
  try {
    Taro.setStorageSync(key, val)
  } catch (e) {
    console.log(`save key ${key} error: `, e)
  }
}
export const getGlobalData = (key: globalDataKey) => {
  return globalData[key]
}

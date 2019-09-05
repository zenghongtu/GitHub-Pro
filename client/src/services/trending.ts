import Taro from "@tarojs/taro"
import { request } from "@/utils/request"

const TRENDING_URL = "https://github-trending-api.now.sh/"

export interface TrendingRepo {
  author: string
  name: string
  avatar: string
  url: string
  description: string
  language?: string
  languageColor?: string
  stars: number
  forks: number
  currentPeriodStars: number
  builtBy: BuiltBy[]
}

interface BuiltBy {
  username: string
  href: string
  avatar: string
}

export interface TrendingRequestParams {
  language?: string
  since?: string
}

export async function getTrendingRepos({
  language = "",
  since = ""
}: TrendingRequestParams): Promise<TrendingRepo[] | null> {
  try {
    // const res = await Taro.cloud.callFunction({
    //   name: "trending",
    //   data: {
    //     type: "repo",
    //     language,
    //     since
    //   }
    // })
    // return res.result.data

    const data = await request(TRENDING_URL, {
      type: "repo",
      language,
      since
    })
    return data
  } catch (e) {
    console.log("get trending repos error : ", e)
    return null
  }
}

export interface TrendingUser {
  author: string
  name: string
  avatar: string
  url: string
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
  currentPeriodStars: number
  builtBy: BuiltBy[]
}

interface BuiltBy {
  username: string
  href: string
  avatar: string
}

export async function getTrendingUsers({
  language = "",
  since = ""
}: TrendingRequestParams): Promise<TrendingUser[] | null> {
  try {
    // const res = await Taro.cloud.callFunction({
    //   name: "trending",
    // data: {
    //   type: "user",
    //   language,
    //   since
    // }
    // })
    // return res.result.data

    const data = await request(TRENDING_URL, {
      type: "user",
      language,
      since
    })
    return data
  } catch (e) {
    console.log("get trending users error : ", e)
    return null
  }
}

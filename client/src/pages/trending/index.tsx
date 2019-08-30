import Taro, {
  Component,
  Config,
  useEffect,
  useState,
  usePullDownRefresh,
  useDidShow,
  useRef
} from "@tarojs/taro"
import { View, Text, Block } from "@tarojs/components"
import { AtTabs, AtTabsPane, AtIcon, AtFab, AtDrawer, AtDivider } from "taro-ui"

import NavBar from "../../components/navbar"
import "./index.scss"
import {
  getTrendingRepos,
  TrendingRepo,
  TrendingUser,
  getTrendingUsers,
  TrendingRequestParams
} from "../../services/trending"
import RepoCard from "./repo_card"
import MyLanguage from "./language"
import FabButton from "../../components/fab-button"

export interface LanguageParams {
  language: string
  title: string
}

interface TrendingRepoState {
  [id: number]: TrendingRepo[] | null
}

const tabList = [
  { title: "Today", value: "daily" },
  { title: "Week", value: "weekly" },
  { title: "Month", value: "monthly" }
]
const defaultTitle = "All languages"

const Trending = () => {
  const [repos, setRepos] = useState<TrendingRepoState>({})
  // const [users, setUsers] = useState<TrendingUser[] | null>(null)
  const [title, setTitle] = useState<string>(defaultTitle)
  const [currTab, setCurrTab] = useState<number>(0)
  const [params, setParams] = useState<TrendingRequestParams>({})
  const [showLangDrawer, setShowLangDrawer] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<number>(0)
  const countRef = useRef(0)

  usePullDownRefresh(() => {
    setRepos({ [currTab]: null })
    setRefresh(++countRef.current)
    console.log("refresh + 1: ", refresh + 1)
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 500)
  })

  useEffect(() => {
    Taro.showLoading({ title: "loading.." })
    getTrendingRepos(params)
      .then(data => {
        if (data) {
          if (repos[currTab]) {
            setRepos({ [currTab]: data })
          } else {
            setRepos({ ...repos, [currTab]: data })
          }
        } else {
          throw new Error(data || "")
        }
      })
      .catch(err => {
        Taro.showToast({
          title: "Something error, Try later",
          icon: "none"
        })
      })
      .finally(() => {
        Taro.hideLoading()
      })

    // getTrendingUsers(params).then(data => {
    //   if (!data) {
    //     // TODO handle error
    //     return
    //   }
    //   setRepos(data)
    // })
  }, [params, refresh])

  const handleClickTab = val => {
    setCurrTab(val)
    if (!repos[val]) {
      setParams({ ...params, since: tabList[val].value })
    }
  }

  const handleToggleLangDrawer = isShow => () => {
    setShowLangDrawer(isShow)
  }

  const handleChangeParams = ({ language, title }: LanguageParams) => {
    setParams({ ...params, language })
    setTitle(title)
    setShowLangDrawer(false)
  }

  return (
    <Block>
      <NavBar path="trending" title={title}></NavBar>
      <View>
        <View>
          <AtTabs current={currTab} tabList={tabList} onClick={handleClickTab}>
            {tabList.map((tab, idx) => {
              return (
                <AtTabsPane key={idx} current={currTab} index={idx}>
                  <View>
                    {repos[idx] ? (
                      repos[idx]!.map(repo => {
                        return (
                          <Block key={repo.url}>
                            <RepoCard repo={repo}></RepoCard>
                          </Block>
                        )
                      })
                    ) : (
                      <View>努力加载中...</View>
                    )}
                  </View>
                </AtTabsPane>
              )
            })}
          </AtTabs>
        </View>

        <FabButton onClick={handleToggleLangDrawer(true)}></FabButton>
        <AtDrawer
          show={showLangDrawer}
          right
          mask
          onClose={handleToggleLangDrawer(false)}
        >
          <View>
            <MyLanguage onChangeLang={handleChangeParams}></MyLanguage>
          </View>
        </AtDrawer>
      </View>
    </Block>
  )
}

Trending.config = {
  enablePullDownRefresh: true
}

export default Trending

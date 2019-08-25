import Taro, {
  Component,
  Config,
  useEffect,
  useState,
  usePullDownRefresh,
  useDidShow
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
} from "./services"
import RepoCard from "./repo_card"
import MyLanguage from "./language"
import FabButton from "../../components/fab-button"
import Taro from "@tarojs/taro"

export interface LanguageParams {
  language: string
  title: string
}

interface TrendingRepoState {
  [id: number]: TrendingRepo[]
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

  useEffect(() => {
    Taro.showLoading()
    getTrendingRepos(params).then(data => {
      if (!data) {
        // TODO handle error
        return
      }
      if (repos[currTab]) {
        setRepos({ [currTab]: data })
      } else {
        setRepos({ ...repos, [currTab]: data })
      }
      Taro.hideLoading()
    })

    // getTrendingUsers(params).then(data => {
    //   if (!data) {
    //     // TODO handle error
    //     return
    //   }
    //   setRepos(data)
    // })
  }, [params])

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
                      repos[idx].map(repo => {
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

export default Trending

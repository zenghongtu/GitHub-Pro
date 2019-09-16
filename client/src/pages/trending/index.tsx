import Taro, {
  Component,
  Config,
  useEffect,
  useState,
  usePullDownRefresh,
  useDidShow,
  useRef,
  useShareAppMessage
} from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtIcon, AtFab, AtDrawer, AtDivider } from 'taro-ui'

import './index.scss'
import {
  getTrendingRepos,
  TrendingRepo,
  TrendingUser,
  getTrendingUsers,
  TrendingRequestParams
} from '../../services/trending'
import RepoItem from './repo-item'
import MyLanguage, { defaultLang } from './language'
import FabButton from '../../components/fab-button'
import Empty from '@/components/empty'

export interface LanguageParams {
  language: string
  title: string
}

interface TrendingRepoState {
  [id: number]: TrendingRepo[] | null
}

const tabList = [
  { title: 'daily', value: 'daily' },
  { title: 'weekly', value: 'weekly' },
  { title: 'monthly', value: 'monthly' }
]

const defaultTrendingPramas = {
  since: 'daily'
}

const current = Taro.getStorageSync('current') || defaultLang
const currLang = current.replace(/^\S/, s => s.toUpperCase())

const Trending = () => {
  const [repos, setRepos] = useState<TrendingRepoState>({})
  // const [users, setUsers] = useState<TrendingUser[] | null>(null)
  const [title, setTitle] = useState<string>(currLang)
  const [currTab, setCurrTab] = useState<number>(0)
  const [params, setParams] = useState<TrendingRequestParams>(
    defaultTrendingPramas
  )
  const [showLangDrawer, setShowLangDrawer] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<number>(0)
  const countRef = useRef(0)

  useEffect(() => {
    Taro.setNavigationBarTitle({ title })
  }, [title])

  usePullDownRefresh(() => {
    setRepos({ [currTab]: null })
    setRefresh(++countRef.current)
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 0)
  })

  useShareAppMessage(res => {
    return {
      title: `GitHub Trending`,
      path: `/pages/trending/index`
    }
  })

  const getRepos = (params: TrendingRequestParams) => {
    Taro.showLoading({ title: 'loading..' })
    getTrendingRepos(params)
      .then(data => {
        if (data) {
          if (repos[currTab]) {
            setRepos({ [currTab]: data })
          } else {
            setRepos({ ...repos, [currTab]: data })
          }
        } else {
          throw new Error(data || '')
        }
      })
      .catch(err => {
        Taro.showToast({
          title: 'Something error, Try later',
          icon: 'none'
        })
      })
      .finally(() => {
        Taro.hideLoading()
      })
  }

  useEffect(() => {
    getRepos(params)

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
    Taro.setStorageSync('current', language)
    setTitle(title)
    setShowLangDrawer(false)
  }

  return (
    <Block>
      <View>
        <View>
          <AtTabs current={currTab} tabList={tabList} onClick={handleClickTab}>
            {tabList.map((tab, idx) => {
              const _repos = repos[idx]
              const data = _repos && _repos!.length > 0 ? _repos : null
              return (
                <AtTabsPane key={tab.title} current={currTab} index={idx}>
                  <View>
                    {data ? (
                      data.map((repo, index) => {
                        return (
                          <Block key={repo.url}>
                            <RepoItem repo={repo} index={index}></RepoItem>
                          </Block>
                        )
                      })
                    ) : (
                      <Empty></Empty>
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
            <MyLanguage
              curTitle={title}
              onChangeLang={handleChangeParams}
            ></MyLanguage>
          </View>
        </AtDrawer>
      </View>
    </Block>
  )
}

export default Trending

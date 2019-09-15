import Taro, {
  Component,
  Config,
  useRouter,
  useState,
  useEffect,
  useReachBottom,
  usePullDownRefresh
} from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import { getIssues, Issue } from '../../services/issues'
import { defaultParams } from '../../constants'
import { AtTabs, AtTabsPane } from 'taro-ui'
import IssueItem from './issue-item'
import Empty from '@/components/empty'
import FabButton from '@/components/fab-button'
import LoadMore from '../../components/load-more/index'

const Issues = () => {
  const {
    params: { full_name: _full_name, owner, repo }
  } = useRouter()
  const full_name = _full_name || `${owner}/${repo}`

  const [count, setCount] = useState(0)
  const [curTab, setTab] = useState(0)
  const [openHasMore, setOpenHasMore] = useState(true)
  const [closedHasMore, setClosedHasMore] = useState(true)
  const [openList, setOpenList] = useState<Issue[] | null>(null)
  const [closedList, setClosedtList] = useState<Issue[] | null>(null)

  useEffect(() => {
    const title = full_name
    Taro.setNavigationBarTitle({ title })
  }, [])

  const [openParams, setOpenParams] = useState({
    ...defaultParams,
    filter: 'all',
    state: 'open'
  })
  const [closedParams, setClosedParams] = useState({
    ...defaultParams,
    filter: 'all',
    state: 'closed'
  })

  usePullDownRefresh(() => {
    setOpenParams({ ...openParams, page: 1 })
    setClosedParams({ ...closedParams, page: 1 })
    setClosedHasMore(true)
    setOpenHasMore(true)
    setCount(count + 1)
  })

  useReachBottom(() => {
    if (curTab === 0) {
      setOpenParams({ ...openParams, page: openParams.page! + 1 })
    } else {
      setClosedParams({ ...closedParams, page: closedParams.page! + 1 })
    }
  })

  const getClosedIssues = params => {
    getIssues(full_name, params).then(data => {
      if (data) {
        if (closedList) {
          setClosedtList([...closedList, ...data])
        } else {
          setClosedtList(data)
        }
        if (data.length < params.per_page) {
          setClosedHasMore(false)
        }
      }
    })
  }

  useEffect(() => {
    if (openHasMore) {
      getIssues(full_name, openParams).then(data => {
        if (data) {
          if (openList) {
            debugger
            setOpenList([...openList, ...data])
          } else {
            setOpenList(data)
          }

          if (data.length < openParams.per_page!) {
            setOpenHasMore(false)
          }
        }
      })
    }
  }, [openParams, count])

  useEffect(() => {
    if (openList && closedHasMore) {
      getClosedIssues(closedParams)
    }
  }, [closedParams, count])

  useEffect(() => {
    if (!closedList && curTab === 1) {
      getClosedIssues(closedParams)
    }
  }, [curTab])

  const tabList = [
    { title: 'open', data: openList, hasMore: openHasMore },
    { title: 'closed', data: closedList, hasMore: closedHasMore }
  ]

  const handleTabClick = val => {
    setTab(val)
  }

  const handleFaBtnClick = () => {
    Taro.navigateTo({
      url: `/pages/issues/create-issue/index?full_name=${full_name}`
    })
  }
  // TODO use scrollView

  return (
    <View>
      <AtTabs current={curTab} tabList={tabList} onClick={handleTabClick}>
        {tabList.map((tab, idx) => {
          const data = tab.data
          return (
            <AtTabsPane key={tab.title} current={curTab} index={idx}>
              <View>
                {data ? (
                  <Block>
                    {data.map(item => {
                      return (
                        <IssueItem
                          key={item.id}
                          full_name={full_name}
                          issue={item}
                        ></IssueItem>
                      )
                    })}
                    <LoadMore hasMore={tab.hasMore}></LoadMore>
                  </Block>
                ) : (
                  <Empty></Empty>
                )}
              </View>
            </AtTabsPane>
          )
        })}
      </AtTabs>
      <FabButton icon="add" onClick={handleFaBtnClick}></FabButton>
    </View>
  )
}

export default Issues

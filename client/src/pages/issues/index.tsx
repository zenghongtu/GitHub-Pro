import Taro, {
  Component,
  Config,
  useRouter,
  useState,
  useEffect
} from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import { getIssues, Issue } from "../../services/issues"
import { defaultParams } from "../../constants"
import { AtTabs, AtTabsPane } from "taro-ui"
import IssueItem from "./issue-item"
import Empty from "@/components/empty"

const Issues = () => {
  const {
    params: { owner, repo }
  } = useRouter()
  const full_name = `${owner}/${repo}`

  const [curTab, setTab] = useState(0)
  const [openList, setOpenList] = useState<Issue[] | null>(null)
  const [closedList, setClosedtList] = useState<Issue[] | null>(null)

  const [openParams, setOpenParams] = useState({
    ...defaultParams,
    filter: "all",
    state: "open"
  })
  const [closedParams, setClosedParams] = useState({
    ...defaultParams,
    filter: "all",
    state: "closed"
  })

  const getClosedIssues = params => {
    getIssues(full_name, params).then(data => {
      setClosedtList(data)
    })
  }

  useEffect(() => {
    getIssues(full_name, openParams).then(data => {
      setOpenList(data)
    })
  }, [openParams])

  useEffect(() => {
    if (openList) {
      getClosedIssues(closedParams)
    }
  }, [closedParams])

  useEffect(() => {
    if (!closedList && curTab === 1) {
      getClosedIssues(closedParams)
    }
  }, [curTab])

  const tabList = [
    { title: "open", data: openList },
    { title: "closed", data: closedList }
  ]

  const handleTabClick = val => {
    setTab(val)
  }

  return (
    <View>
      <AtTabs current={curTab} tabList={tabList} onClick={handleTabClick}>
        {tabList.map((tab, idx) => {
          const data = tab.data
          return (
            <AtTabsPane key={idx} current={curTab} index={idx}>
              <View>
                {data ? (
                  data.map(item => {
                    return <IssueItem key={item.id} issue={item}></IssueItem>
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
  )
}

export default Issues

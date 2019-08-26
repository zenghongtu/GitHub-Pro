import Taro, {
  Component,
  useEffect,
  useState,
  useReachBottom
} from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import NavBar from "../../components/navbar"

import { getStarred, IStarred } from "../../services/user"
import Empty from "../../components/empty"
import RepoItem from "../../components/repo-item"
import { defaultParams } from "../../constants"

const StarredRepos = () => {
  const [starredRepos, setStarredRepos] = useState<IStarred[] | null>(null)
  const [starredParams, setStarredParams] = useState(defaultParams)

  useEffect(() => {
    getStarred(starredParams).then(data => {
      if (data) {
        if (starredRepos) {
          setStarredRepos([...starredRepos, ...data])
        } else {
          setStarredRepos(data)
        }
      }
    })
  }, [starredParams])

  useReachBottom(() => {
    setStarredParams({ ...starredParams, page: starredParams.page + 1 })
  })

  return (
    <View>
      <NavBar title="Starred repos"></NavBar>
      <View>
        {starredRepos ? (
          starredRepos.map((item, idx) => {
            return <RepoItem key={idx} repo={item}></RepoItem>
          })
        ) : (
          <Empty></Empty>
        )}
      </View>
    </View>
  )
}

export default StarredRepos

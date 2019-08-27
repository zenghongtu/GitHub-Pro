import Taro, from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import NavBar from "../../components/navbar"

import { IStarred, IUserInfo } from "../../services/user"
import Empty from "../../components/empty"
import RepoItem from "../../components/repo-item"
import useRequest from "../../hooks/useReqeust"
import { getUserStarred } from "../../services/users"
import { getGlobalData } from "../../utils/global_data"

const StarredRepos = () => {
  const userInfo = getGlobalData("userInfo") as IUserInfo
  const [starredRepos, refresh] = useRequest<IStarred>(
    userInfo.login,
    getUserStarred
  )

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

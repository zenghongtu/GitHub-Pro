import Taro from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import NavBar from "../../components/navbar"

import { IStarred, IUserInfo } from "../../services/user"
import Empty from "../../components/empty"
import RepoItem from "../../components/repo-item"
import useRequestWIthMore from "../../hooks/useRequestWIthMore"
import { getUserStarred } from "../../services/users"
import { getGlobalData } from "../../utils/global_data"
import LoadMore from "@/components/load-more"

const StarredRepos = () => {
  const userInfo = getGlobalData("userInfo") as IUserInfo
  const [starredRepos, hasMore, refresh] = useRequestWIthMore<IStarred>(
    userInfo.login,
    getUserStarred
  )

  return (
    <View>
      <NavBar title="Starred repos" path="starred"></NavBar>
      <View>
        {starredRepos ? (
          starredRepos.map((item, idx) => {
            return <RepoItem key={idx} repo={item}></RepoItem>
          })
        ) : (
          <Empty></Empty>
        )}
      </View>
      {starredRepos && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  )
}

export default StarredRepos

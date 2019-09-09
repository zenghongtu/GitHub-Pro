import Taro, { Component, Config, useRouter } from "@tarojs/taro"
import { View, Text, Block } from "@tarojs/components"
import "./index.scss"
import useRequestWIthMore from "@/hooks/useRequestWIthMore"
import { getCommits, CommitItemData } from "@/services/commits"
import Empty from "@/components/empty"
import CommitItem from "./commit-item"
import LoadMore from "@/components/load-more"

const Commits = () => {
  const {
    params: { owner, repo }
  } = useRouter()
  const full_name = `${owner}/${repo}`
  const [commitList, hasMore, refresh] = useRequestWIthMore<
    CommitItemData,
    any
  >({ full_name }, getCommits)

  return (
    <View>
      {commitList ? (
        <Block>
          {commitList.map(item => {
            return <CommitItem commit={item} key={item.node_id}></CommitItem>
          })}
          <LoadMore hasMore={!!hasMore}></LoadMore>
        </Block>
      ) : (
        <Empty></Empty>
      )}
    </View>
  )
}

export default Commits

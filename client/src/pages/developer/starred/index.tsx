import Taro, { useRouter, useReachBottom, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { IStarred, IUserInfo } from '@/services/user'
import Empty from '@/components/empty'
import RepoItem from '@/components/repo-item'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import { getUserStarred } from '@/services/users'
import LoadMore from '@/components/load-more'

const StarredRepoList = () => {
  const {
    params: { name }
  } = useRouter()

  const [starredRepos, hasMore, refresh, getMoreData] = useRequestWIthMore<
    IStarred
  >(name, getUserStarred)

  useEffect(() => {
    const title = `${name} - Starred`
    Taro.setNavigationBarTitle({ title })
  }, [])

  useReachBottom(() => {
    getMoreData!()
  })

  return (
    <View>
      <View>
        {starredRepos ? (
          starredRepos.map((item, idx) => {
            return <RepoItem key={item.id} repo={item}></RepoItem>
          })
        ) : (
          <Empty></Empty>
        )}
      </View>
      {starredRepos && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  )
}

export default StarredRepoList

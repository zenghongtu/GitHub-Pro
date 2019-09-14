import Taro, { useRouter, useReachBottom } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { IStarred, IUserInfo, getCurrentUserRepos } from '@/services/user'
import Empty from '@/components/empty'
import RepoItem from '@/components/repo-item'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import { getUserStarred, getUserRepos } from '@/services/users'
import LoadMore from '@/components/load-more'

const RepoList = () => {
  const {
    params: { name, isCurrent }
  } = useRouter()

  let func = getUserRepos
  if (isCurrent) {
    func = getCurrentUserRepos
  }

  const [repoList, hasMore, refresh, getMoreData] = useRequestWIthMore<any>(
    name,
    func
  )

  useReachBottom(() => {
    getMoreData!()
  })

  return (
    <View>
      <View>
        {repoList ? (
          repoList.map((item, idx) => {
            return <RepoItem key={idx} repo={item}></RepoItem>
          })
        ) : (
          <Empty></Empty>
        )}
      </View>
      {repoList && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  )
}

export default RepoList

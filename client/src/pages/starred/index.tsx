import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { IStarred, IUserInfo } from '../../services/user'
import Empty from '../../components/empty'
import RepoItem from '../../components/repo-item'
import useRequestWIthMore from '../../hooks/useRequestWIthMore'
import { getUserStarred } from '../../services/users'
import { getGlobalData } from '../../utils/global_data'
import LoadMore from '@/components/load-more'
import NoAuthority from '@/components/no-authority'

const StarredRepos = () => {
  const username = getGlobalData('username') as string
  if (!username) {
    return <NoAuthority></NoAuthority>
  }
  const [starredRepos, hasMore, refresh] = useRequestWIthMore<IStarred>(
    username,
    getUserStarred
  )

  return (
    <View>
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

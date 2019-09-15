import Taro from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'

import { IStarred, IUserInfo } from '../../services/user'
import Empty from '../../components/empty'
import RepoItem from '../../components/repo-item'
import useRequestWIthMore from '../../hooks/useRequestWIthMore'
import { getUserStarred } from '../../services/users'
import { getGlobalData } from '../../utils/global_data'
import LoadMore from '@/components/load-more'
import NoAuthority from '@/components/no-authority'

const StarredContent = ({ username }) => {
  const [starredRepos, hasMore, refresh] = useRequestWIthMore<IStarred>(
    username,
    getUserStarred
  )

  return (
    <View>
      <View>
        {starredRepos ? (
          <View className="content-wrap">
            {starredRepos.map((item, idx) => {
              return <RepoItem key={item.id} repo={item}></RepoItem>
            })}
          </View>
        ) : (
          <Empty></Empty>
        )}
      </View>
      {starredRepos && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  )
}

export default StarredContent

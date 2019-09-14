import Taro, {
  Component,
  Config,
  useRouter,
  useEffect,
  useReachBottom
} from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'

import { getUserFollowing } from '@/services/users'
import UserItem from '@/components/user-item'

const Following = () => {
  const {
    params: { name }
  } = useRouter()

  const [data, hasMore, refresh, getMore] = useRequestWIthMore<any, any>(
    name,
    getUserFollowing
  )

  useEffect(() => {
    const title = `${name} - Following`
    Taro.setNavigationBarTitle({ title })
  }, [])

  useReachBottom(() => {
    getMore!()
  })

  return <UserItem data={data} hasMore={hasMore}></UserItem>
}

export default Following

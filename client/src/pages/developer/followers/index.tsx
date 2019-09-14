import Taro, {
  Component,
  Config,
  useRouter,
  useEffect,
  useReachBottom
} from '@tarojs/taro'

import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'

import { getUserFollowers } from '@/services/users'
import UserItem from '@/components/user-item'

const Followers = () => {
  const {
    params: { name }
  } = useRouter()

  const [data, hasMore, refresh, getMore] = useRequestWIthMore<any, any>(
    name,
    getUserFollowers
  )

  useEffect(() => {
    const title = `${name} - Followers`
    Taro.setNavigationBarTitle({ title })
  }, [])

  useReachBottom(() => {
    getMore!()
  })

  return <UserItem data={data} hasMore={hasMore}></UserItem>
}

export default Followers

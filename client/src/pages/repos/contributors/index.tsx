import Taro, {
  Component,
  Config,
  useRouter,
  useEffect,
  useReachBottom
} from '@tarojs/taro'

import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import { getContributors, Contributor } from '@/services/repos'

import UserItem from '@/components/user-item'

const Contributors = () => {
  const {
    params: { owner, repo }
  } = useRouter()
  const full_name = `${owner}/${repo}`

  const [contributors, hasMore, refresh, getMore] = useRequestWIthMore<
    Contributor,
    any
  >({ full_name }, getContributors)

  useEffect(() => {
    const title = `${full_name} - Contributors`
    Taro.setNavigationBarTitle({ title })
  }, [])

  useReachBottom(() => {
    getMore!()
  })

  return <UserItem data={contributors} hasMore={hasMore}></UserItem>
}

export default Contributors

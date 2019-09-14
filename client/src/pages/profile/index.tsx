import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom,
  useShareAppMessage,
  useRouter
} from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'

import './index.scss'
import { getGlobalData, setGlobalData } from '@/utils/global_data'
import { getCurrentUser, IUserInfo } from '@/services/user'
import UserInfo from '@/components/user-info'
import NoAuthority from '@/components/no-authority'

const Profile = () => {
  const {
    params: { refresh = false }
  } = useRouter()

  const username = getGlobalData('username') as string
  if (!username && !refresh) {
    return <NoAuthority></NoAuthority>
  }
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

  useEffect(() => {
    getCurrentUser().then(data => {
      if (data) {
        setUserInfo(data)
        setGlobalData('username', data.login)
      }
    })
  }, [])

  useShareAppMessage(res => {
    const title = `[${userInfo!.login}] ${userInfo!.bio}`

    return {
      title,
      path: `/pages/developer/index?name=${username}`
    }
  })

  return (
    <Block>
      <UserInfo userInfo={userInfo}></UserInfo>
    </Block>
  )
}

export default Profile

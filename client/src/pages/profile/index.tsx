import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom
} from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'

import './index.scss'
import { getGlobalData, setGlobalData } from '@/utils/global_data'
import { getCurrentUser, IUserInfo } from '@/services/user'
import { showLoginTips, copyText } from '@/utils/common'
import UserInfo from '@/components/user-info'

const Profile = () => {
  const username = getGlobalData('username') as string
  if (!username) {
    showLoginTips()
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

  return (
    <Block>
      <UserInfo userInfo={userInfo}></UserInfo>
    </Block>
  )
}

export default Profile

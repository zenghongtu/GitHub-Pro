import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom,
  useShareAppMessage,
  useRouter,
  useDidShow
} from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'

import './index.scss'
import { getGlobalData, setGlobalData } from '@/utils/global_data'
import { getCurrentUser, IUserInfo } from '@/services/user'
import UserInfo from '@/components/user-info'
import Empty from '@/components/empty'

const ProfileContent = ({ username }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

  const getUser = () => {
    getCurrentUser().then(data => {
      if (data) {
        setUserInfo(data)
        setGlobalData('username', data.login)
      }
    })
  }
  useEffect(() => {
    if (username) {
      getUser()
    }
  }, [])

  useShareAppMessage(res => {
    const title = `[${userInfo!.login}] ${userInfo!.bio}`

    return {
      title,
      path: `/pages/developer/index?name=${userInfo!.login}`
    }
  })

  const handleLogout = () => {
    Taro.showModal({
      content: 'Are you sure?',
      cancelText: 'No',
      cancelColor: '#fb3e3b',
      confirmText: 'Sure',
      confirmColor: '#007afb',

      success(res) {
        if (res.confirm) {
          setGlobalData('username', '')
          setGlobalData('authorization', '')
          setUserInfo(null)
          Taro.switchTab({ url: '/pages/trending/index' })
        } else if (res.cancel) {
        }
      }
    })
  }

  return (
    <Block>
      {userInfo ? (
        <UserInfo userInfo={userInfo} onLogout={handleLogout}></UserInfo>
      ) : (
        <Empty></Empty>
      )}
    </Block>
  )
}

export default ProfileContent

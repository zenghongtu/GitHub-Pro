import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom,
  useShareAppMessage,
  useRouter,
  useDidShow,
  usePullDownRefresh
} from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'

import './index.scss'

import NoAuthority from '@/components/no-authority'
import ProfileContent from './content'
import { useSelector } from '@tarojs/redux'

const Profile = () => {
  const username = useSelector<any, any>(state => state.user.username)

  const [refreshCount, setRefreshCount] = useState(0)

  usePullDownRefresh(() => {
    setRefreshCount(refreshCount => refreshCount + 1)
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    })
  })

  return (
    <Block>
      {username ? (
        <ProfileContent
          username={username}
          refreshCount={refreshCount}
        ></ProfileContent>
      ) : (
        <NoAuthority></NoAuthority>
      )}
    </Block>
  )
}

export default Profile

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
import useName from '@/hooks/useName'

const Profile = () => {
  const [name] = useName()
  const [refreshCount, setRefreshCount] = useState(0)

  usePullDownRefresh(() => {
    setRefreshCount(refreshCount => refreshCount + 1)
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    })
  })

  return (
    <Block>
      {name ? (
        <ProfileContent
          username={name}
          refreshCount={refreshCount}
        ></ProfileContent>
      ) : (
        <NoAuthority></NoAuthority>
      )}
    </Block>
  )
}

export default Profile

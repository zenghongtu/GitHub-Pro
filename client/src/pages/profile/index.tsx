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

import NoAuthority from '@/components/no-authority'
import ProfileContent from './content'
import useName from '@/hooks/useName'

const Profile = () => {
  const [name] = useName()

  return (
    <Block>
      {name ? (
        <ProfileContent username={name}></ProfileContent>
      ) : (
        <NoAuthority></NoAuthority>
      )}
    </Block>
  )
}

export default Profile

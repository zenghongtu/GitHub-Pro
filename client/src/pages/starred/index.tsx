import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import NoAuthority from '@/components/no-authority'
import StarredContent from './content'
import useName from '@/hooks/useName'
import useReachBottomEvent from '@/hooks/useReachBottomEvent'

const StarredRepos = () => {
  const [name] = useName()
  useReachBottomEvent()

  return (
    <View>
      {name ? (
        <StarredContent username={name}></StarredContent>
      ) : (
        <NoAuthority></NoAuthority>
      )}
    </View>
  )
}

export default StarredRepos

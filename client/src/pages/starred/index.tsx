import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import NoAuthority from '@/components/no-authority'
import StarredContent from './content'
import useReachBottomEvent from '@/hooks/useReachBottomEvent'
import usePullDownRefreshEvent from '@/hooks/usePullDownRefreshEvent'
import { useSelector } from '@tarojs/redux'

const StarredRepos = () => {
  const username = useSelector<any, any>(state => state.user.username)

  useReachBottomEvent()
  usePullDownRefreshEvent()

  return (
    <View>
      {username ? (
        <StarredContent username={username}></StarredContent>
      ) : (
        <NoAuthority></NoAuthority>
      )}
    </View>
  )
}

export default StarredRepos

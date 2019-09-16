import Taro from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import NewContent from './content'
import useReachBottomEvent from '@/hooks/useReachBottomEvent'
import usePullDownRefreshEvent from '@/hooks/usePullDownRefreshEvent'
import { useSelector } from '@tarojs/redux'

const News = () => {
  const username = useSelector<any, any>(state => state.user.username)

  useReachBottomEvent()
  usePullDownRefreshEvent()

  return (
    <View className="wrap">
      <NewContent username={username}></NewContent>
    </View>
  )
}

export default News

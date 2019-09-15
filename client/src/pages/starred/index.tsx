import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import NoAuthority from '@/components/no-authority'
import StarredContent from './content'
import useName from '@/hooks/useName'

const StarredRepos = () => {
  const [name] = useName()

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

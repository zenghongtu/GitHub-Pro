import Taro, { Component, Config, useDidShow, useState } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import NoAuthority from '@/components/no-authority'
import NewContent from './content'
import useName from '@/hooks/useName'
import useReachBottomEvent from '@/hooks/useReachBottomEvent'

const News = () => {
  const [name] = useName()
  useReachBottomEvent()
  return (
    <View className="wrap">
      <NewContent username={name}></NewContent>
    </View>
  )
}

export default News

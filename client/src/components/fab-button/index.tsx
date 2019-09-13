import Taro, { Component, useState } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtFab, AtIcon } from 'taro-ui'
import './index.scss'
import { ITouchEvent } from '@tarojs/components/types/common'

interface FabButtonProps {
  icon?: string
  prefixClass?: string
  onClick: (e: ITouchEvent) => void
}

const FabButton = ({
  icon = 'filter',
  prefixClass = '',
  onClick
}: FabButtonProps) => {
  const props: any = { value: icon }
  if (prefixClass) {
    props.prefixClass = prefixClass
  }
  return (
    <View className="fab-btn" onClick={onClick}>
      <AtFab size="small">
        <AtIcon {...props}></AtIcon>
      </AtFab>
    </View>
  )
}

export default FabButton

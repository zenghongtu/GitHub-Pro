import Taro, { Component, useState } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtFab, AtIcon } from 'taro-ui'
import './index.scss'

interface FabButtonProps {
  icon?: string
  onClick: () => void
}

const FabButton = ({ icon = 'filter', onClick }: FabButtonProps) => {
  return (
    <View className="fab-btn" onClick={onClick}>
      <AtFab size="small">
        <AtIcon value={icon}></AtIcon>
      </AtFab>
    </View>
  )
}

export default FabButton

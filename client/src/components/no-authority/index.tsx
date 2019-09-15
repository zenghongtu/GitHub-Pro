import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import img from '@/assets/ironcat.jpg'
import { AtButton } from 'taro-ui'

const NoAuthority = () => {
  return (
    <View className="wrap">
      <View className="inner">
        <Image src={img} className="img"></Image>
        <View className="desc">This page required login to view!</View>
        <View className="login">
          <AtButton
            size="small"
            type="primary"
            onClick={() => {
              Taro.navigateTo({ url: `/pages/login/index` })
            }}
          >
            Go to Login
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default NoAuthority

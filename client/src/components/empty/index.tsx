import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import img from '@/assets/spidertocat.png'

const Empty = () => {
  return (
    <View className="wrap">
      <View className="inner">
        <Image src={img} className="img"></Image>
        <View className="desc">No Data.</View>
        {/* <View>
          <AtButton
            size="small"
            type="primary"
            onClick={() => {
              Taro.startPullDownRefresh()
            }}
          >
            retry
          </AtButton>
        </View> */}
      </View>
    </View>
  )
}

export default Empty

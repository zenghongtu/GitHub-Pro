import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { AtLoadMore } from "taro-ui"
import "./index.scss"

const LoadMore = ({ hasMore }: { hasMore: boolean }) => {
  const status = hasMore ? "loading" : "noMore"
  return (
    <View>
      <AtLoadMore
        loadingText="loading..."
        noMoreText="No more."
        status={status}
      />
    </View>
  )
}

export default LoadMore

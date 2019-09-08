import Taro, { Component, Config } from "@tarojs/taro"
import { View, Image, Text } from "@tarojs/components"
import "./index.scss"
import Avatar from "../avatar"
import { getFormatDate } from "@/utils/date"

const Author = ({ login, created_at, url }) => {
  return (
    <View className="author">
      <Avatar url={url}></Avatar>
      <Text className="login">{login}</Text>
      <Text className="create-at">{getFormatDate(created_at)}</Text>
    </View>
  )
}

export default Author

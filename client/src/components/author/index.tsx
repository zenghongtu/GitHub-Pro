import Taro, { Component, Config } from "@tarojs/taro"
import { View, Image, Text } from "@tarojs/components"
import "./index.scss"
import Avatar from "../avatar"
import { getFormatDate } from "@/utils/date"

const Author = ({ login, url, created_at = "" }) => {
  return (
    <View
      className="author"
      style={!!created_at ? undefined : { alignItems: "center" }}
    >
      <Avatar url={url}></Avatar>
      <Text className="login">{login}</Text>
      {!!created_at && (
        <Text className="create-at">{getFormatDate(created_at)}</Text>
      )}
    </View>
  )
}

export default Author

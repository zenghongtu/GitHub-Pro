import Taro, { Component, Config } from "@tarojs/taro"
import { View, Image } from "@tarojs/components"
import "./index.scss"

interface AvatarProps {
  url: string
  username?: string
  size?: string | number
}
const Avatar = ({ url, username = "", size = 40 }: AvatarProps) => {
  // TODO nav to developer profile
  const width = size + "px"
  const styleProps = {
    width,
    height: width
  }
  return (
    <View>
      <Image className="avatar" style={styleProps} src={url}></Image>
    </View>
  )
}

export default Avatar

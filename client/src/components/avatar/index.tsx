import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'
import './index.scss'

interface AvatarProps {
  url: string
  className?: string
  username?: string
  circle?: boolean
  size?: string | number
}
const Avatar = ({
  url,
  className = '',
  username = '',
  circle = true,
  size = 40
}: AvatarProps) => {
  const width = size + 'px'
  const styleProps: any = {
    width,
    height: width
  }

  if (!circle) {
    styleProps.borderRadius = +size / 4 + 'px'
  }

  const handleImgClick = () => {
    if (!username) {
      return
    }
    const url = `/pages/developer/index?name=${username}`
    Taro.navigateTo({ url })
  }

  return (
    <Block>
      <Image
        onClick={handleImgClick}
        className={`avatar ${className}`}
        style={styleProps}
        src={url}
      ></Image>
    </Block>
  )
}

export default Avatar

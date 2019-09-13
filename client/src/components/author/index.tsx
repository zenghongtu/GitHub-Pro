import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import Avatar from '../avatar'
import { getFormatDate, getTimeAgo } from '@/utils/date'

interface AuthorProps {
  login: string
  url: string
  size?: number | string
  created_at?: string
}
const Author = ({ login, url, size, created_at = '' }: AuthorProps) => {
  const handleLoginClick = () => {
    const url = `/pages/developer/index?name=${login}`
    Taro.navigateTo({ url })
  }

  return (
    <View
      className="author"
      style={
        !!created_at ? undefined : { alignItems: 'center', paddingLeft: '20px' }
      }
    >
      <Avatar size={size} username={login} url={url}></Avatar>
      <Text className="login" onClick={handleLoginClick}>
        {login}
      </Text>
      {!!created_at && (
        <Text className="create-at">{getTimeAgo(created_at)}</Text>
      )}
    </View>
  )
}

export default Author

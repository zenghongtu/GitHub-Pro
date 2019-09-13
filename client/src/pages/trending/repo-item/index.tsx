import Taro, { Component, useState } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { AtNavBar, AtDrawer, AtIcon } from 'taro-ui'
import './index.scss'
import { TrendingRepo } from '@/services/trending'
import { getGlobalData } from '@/utils/global_data'
import { IUserInfo } from '@/services/user'
import { ITouchEvent } from '@tarojs/components/types/common'
import FontIcon from '@/components/font-icon'

const RepoItem = ({ repo, index }: { repo: TrendingRepo; index: number }) => {
  if (!repo) {
    return null
  }
  const curUserInfo = getGlobalData('userInfo') as IUserInfo

  const handleCardClick = () => {
    const url = `/pages/repos/index?owner=${author}&repo=${name}`
    Taro.navigateTo({
      url
    })
  }

  const handleAuthorClick = (e: ITouchEvent) => {
    e.stopPropagation()
    let url: string
    if (curUserInfo.login === author) {
      url = `/pages/profile/index`
    } else {
      url = `/pages/developer/index?name=${author}`
    }

    Taro.navigateTo({
      url
    })
  }

  const {
    author,
    name,
    avatar,
    url,
    description,
    language,
    languageColor,
    stars,
    forks,
    currentPeriodStars,
    builtBy
  } = repo

  return (
    <View className="card-wrap" onClick={handleCardClick}>
      <View className="card-top">
        <View className="info">
          <View className="name">
            <View className="index"> {index + 1}</View>
            {name}
          </View>
          <View className="description">{description}</View>
        </View>
        <View className="author" onClick={handleAuthorClick}>
          <Image src={avatar} className="avatar"></Image>
          <View className="author-name">{author}</View>
        </View>
      </View>
      <View className="card-bottom">
        <View className="meta-item">
          <Text
            className="language-color"
            style={{ background: languageColor || '#000000' }}
          ></Text>
          {language || 'null'}
        </View>
        <View className="meta-item">
          <FontIcon styleProps={{ fontSize: '16px' }} value="star"></FontIcon>
          {stars}
        </View>
        <View className="meta-item">
          <FontIcon
            styleProps={{ fontSize: '16px' }}
            value="git-repo-forked"
          ></FontIcon>
          {forks}
        </View>
        <View className="meta-item">{currentPeriodStars} stars today</View>
      </View>
    </View>
  )
}

export default RepoItem

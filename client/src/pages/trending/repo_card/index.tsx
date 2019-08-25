import Taro, { Component, useState } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"
import { AtNavBar, AtDrawer } from "taro-ui"
import "./index.scss"
import { TrendingRepo } from "../services"

const RepoCard = ({ repo }: { repo: TrendingRepo }) => {
  if (!repo) {
    return null
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
    <View>
      <View>
        {author} / {name}
      </View>
      <View>{description}</View>
      <View>
        <Text>
          {languageColor}
          {language}
        </Text>
        <Text>{stars}</Text>
        <Text>{forks}</Text>
      </View>
      <View>{currentPeriodStars}</View>
    </View>
  )
}

export default RepoCard

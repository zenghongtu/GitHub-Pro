import Taro, { Component, useState } from "@tarojs/taro"
import { View, Text, Button, Image } from "@tarojs/components"
import { AtNavBar, AtDrawer, AtIcon } from "taro-ui"
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
    <View className="card-wrap">
      <View className="card-top">
        <View className="info">
          <View className="name">{name}</View>
          <View className="description">{description}</View>
        </View>
        <View className="author">
          <Image src={avatar} className="avatar"></Image>
          <View className="author-name">{author}</View>
        </View>
      </View>
      <View className="card-bottom">
        <View className="meta-item">
          <Text
            className="language-color"
            style={{ background: languageColor || "#000000" }}
          ></Text>
          {language || "null"}
        </View>
        <View className="meta-item">
          <AtIcon customStyle={{ fontSize: "14px" }} value="star"></AtIcon>
          {stars}
        </View>
        <View className="meta-item">
          <AtIcon customStyle={{ fontSize: "14px" }} value="star"></AtIcon>
          {forks}
        </View>
        <View className="meta-item">{currentPeriodStars} stars today</View>
      </View>
    </View>
  )
}

export default RepoCard

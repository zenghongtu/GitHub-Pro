import Taro, { Component, useState, useEffect, useDidShow } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"
import { AtNavBar, AtDrawer, AtIcon } from "taro-ui"
import "./index.scss"
import { getGlobalData } from "../../../utils/global_data"

interface LanguageProps {
  onChangeLang: (params: { language: string; title: string }) => void
}

const Language = ({ onChangeLang }: LanguageProps) => {
  const myLangs = getGlobalData("myLangs")
  const [langs, setLangs] = useState(myLangs)

  useDidShow(() => {
    setLangs(getGlobalData("myLangs"))
  })

  const handleLangClick = e => {
    const { dataset } = e.target
    onChangeLang(dataset)
  }

  const handleIconClick = () => {
    Taro.navigateTo({ url: "/pages/my-languages/index" })
  }

  return (
    <View>
      <View>
        <Text>My languages</Text>
        <AtIcon value="edit" onClick={handleIconClick}></AtIcon>
      </View>
      <View>
        {langs.map(lang => {
          const { title, language } = lang
          return (
            <View
              key={language}
              data-title={title}
              data-language={language}
              onClick={handleLangClick}
            >
              {title}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Language

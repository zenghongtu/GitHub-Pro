import Taro, { Component, useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtNavBar, AtDrawer, AtIcon } from 'taro-ui'
import './index.scss'
import { getGlobalData } from '../../../utils/global_data'
import { LanguageParams } from '..'

export const defaultLang = 'All Languages'

interface LanguageProps {
  onChangeLang: (params: { language: string; title: string }) => void
  curTitle: string
}

const Language = ({ onChangeLang, curTitle }: LanguageProps) => {
  const myLangs = getGlobalData('myLangs') as LanguageParams[]
  const [langs, setLangs] = useState<LanguageParams[]>(myLangs)

  useDidShow(() => {
    setLangs(getGlobalData('myLangs') as LanguageParams[])
  })

  const handleLangClick = e => {
    const { dataset } = e.target
    onChangeLang(dataset)
  }

  const handleIconClick = () => {
    Taro.navigateTo({ url: '/pages/my-languages/index' })
  }

  const activeClassName = '.active'
  return (
    <View className="wrap">
      <View className="title">
        <Text>My languages</Text>
        <AtIcon value="edit" onClick={handleIconClick}></AtIcon>
      </View>
      <View className="lang-list">
        <View
          data-title={defaultLang}
          data-language={''}
          onClick={handleLangClick}
          className={`lang-item ${
            curTitle === defaultLang ? activeClassName : ''
          }`}
        >
          {defaultLang}
        </View>
        {langs.map(lang => {
          const { title, language } = lang
          return (
            <View
              key={language}
              data-title={title}
              data-language={language}
              onClick={handleLangClick}
              className={`lang-item ${
                title === curTitle ? activeClassName : ''
              }`}
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

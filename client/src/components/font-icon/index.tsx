import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { AtIcon } from 'taro-ui'

const FontIcon = ({ value, fontSize = '14px', styleProps = {} }) => {
  return (
    <AtIcon
      prefixClass={'icon'}
      customStyle={{ fontSize, ...styleProps }}
      value={value}
    ></AtIcon>
  )
}

export default FontIcon

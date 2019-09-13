import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { AtIcon } from 'taro-ui'

const FontIcon = ({ value, styleProps = {} }) => {
  return (
    <AtIcon
      prefixClass={'icon'}
      customStyle={{ ...styleProps }}
      value={value}
    ></AtIcon>
  )
}

export default FontIcon

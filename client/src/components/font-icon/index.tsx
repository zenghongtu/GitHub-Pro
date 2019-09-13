import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { AtIcon } from 'taro-ui'

const FontIcon = ({ value, styleProps = {}, ...otherProps }) => {
  return (
    <AtIcon
      prefixClass={'icon'}
      customStyle={{ ...styleProps }}
      value={value}
      {...otherProps}
    ></AtIcon>
  )
}

export default FontIcon

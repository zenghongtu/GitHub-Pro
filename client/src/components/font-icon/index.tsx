import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { AtIcon } from 'taro-ui'

interface FontIconProps {
  value: string
  styleProps?: React.CSSProperties
}
const FontIcon = ({ value, styleProps = {} }: FontIconProps) => {
  return (
    <AtIcon
      prefixClass={'icon'}
      customStyle={styleProps}
      value={value}
    ></AtIcon>
  )
}

export default FontIcon

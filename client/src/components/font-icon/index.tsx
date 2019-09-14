import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { AtIcon } from 'taro-ui'

interface FontIconProps {
  value: string
  size?: string | number
  styleProps?: React.CSSProperties
}
const FontIcon = ({ value, size = 16, styleProps = {} }: FontIconProps) => {
  const style = { fontSize: size + 'px', ...styleProps }
  return (
    <AtIcon prefixClass={'icon'} customStyle={style} value={value}></AtIcon>
  )
}

export default FontIcon

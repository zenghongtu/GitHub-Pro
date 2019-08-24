import Taro, { Component, useState } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"
import { AtNavBar, AtDrawer } from "taro-ui"
import "./index.scss"

const marginTop = Taro.getSystemInfoSync().statusBarHeight

const styleProps = { marginTop: `${marginTop}px` }

export interface NavBarProps {
  title?: string
  isGoBackBtn?: boolean
  leftIconType?: string
  onClickLeftIcon?: () => {}
}

const NavBar = ({
  title = "",
  isGoBackBtn = false,
  leftIconType = "menu",
  onClickLeftIcon
}: NavBarProps) => {
  const [isShowDrawer, setShowDrawer] = useState(false)

  const handleToggleDrawer = () => {
    setShowDrawer(!isShowDrawer)
  }

  const handleClickLeftIcon = () => {
    if (isGoBackBtn) {
      Taro.navigateBack()
    } else {
      ;(onClickLeftIcon || handleToggleDrawer)()
    }
  }

  const curLeftIconType = isGoBackBtn ? "chevron-left" : leftIconType

  return (
    <View style={styleProps}>
      <AtNavBar
        onClickLeftIcon={handleClickLeftIcon}
        title={title}
        leftIconType={curLeftIconType}
      />
      <AtDrawer show={isShowDrawer} onClose={handleToggleDrawer}>
        <View style={styleProps}>
          <View className="drawer-item">Drawer</View>
        </View>
      </AtDrawer>
    </View>
  )
}

export default NavBar

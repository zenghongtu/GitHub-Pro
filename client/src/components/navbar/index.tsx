import Taro, {
  Component,
  useState,
  navigateTo,
  useDidShow,
  useEffect
} from "@tarojs/taro"
import { View, Text, Button, Image, Block } from "@tarojs/components"
import { AtNavBar, AtDrawer } from "taro-ui"
import logo from "../../assets/logo.png"
import "./index.scss"
import { getGlobalData } from "../../utils/global_data"
import { IUserInfo } from "../../services/user"

export interface NavBarProps {
  title?: string
  path?: string
  isGoBackBtn?: boolean
  leftIconType?: string
  onClickLeftIcon?: () => {}
}

const marginTop = Taro.getSystemInfoSync().statusBarHeight

const styleProps = { marginTop: `${marginTop}px` }

const navList = [
  { name: "profile", path: "profile" },
  { name: "trending", path: "trending" },
  { name: "starred", path: "starred" }
]

const NavBar = ({
  title = "",
  path = "",
  isGoBackBtn = false,
  leftIconType = "menu",
  onClickLeftIcon
}: NavBarProps) => {
  const curUserInfo = getGlobalData("userInfo") as IUserInfo

  const [userInfo, setUserInfo] = useState<IUserInfo>(curUserInfo)
  const [isShowDrawer, setShowDrawer] = useState(false)

  useDidShow(() => {
    if (!userInfo) {
      setUserInfo(getGlobalData("userInfo") as IUserInfo)
    }
  })

  const handleToggleDrawer = (isShow = true) => {
    setShowDrawer(isShow)
  }

  const handleClickLeftIcon = () => {
    if (isGoBackBtn) {
      Taro.navigateBack()
    } else {
      ;(onClickLeftIcon || handleToggleDrawer)()
    }
  }
  const handleNavItemClick = path => _ => {
    Taro.navigateTo({ url: `/pages/${path}/index` })
  }

  const handleClickLogo = () => {
    Taro.navigateTo({ url: "/pages/login/index" })
  }

  const curLeftIconType = isGoBackBtn ? "chevron-left" : leftIconType

  return (
    <View style={styleProps}>
      <AtNavBar
        onClickLeftIcon={handleClickLeftIcon}
        title={title}
        leftIconType={curLeftIconType}
      />
      <AtDrawer
        show={isShowDrawer}
        onClose={handleToggleDrawer.bind(this, false)}
      >
        <View className="drawer" style={styleProps}>
          <View className="drawer-header">
            {userInfo ? (
              <Block>
                <Image
                  className="avatar"
                  mode="widthFix"
                  src={userInfo.avatar_url}
                ></Image>
                <View className="name">{userInfo.name}</View>
                <View className="bio">{userInfo.bio}</View>
              </Block>
            ) : (
              <Block>
                <Image
                  className="avatar"
                  mode="widthFix"
                  src={logo}
                  onClick={handleClickLogo}
                ></Image>
                <View>点击登录</View>
              </Block>
            )}
          </View>
          {navList.map(item => {
            const { name, path } = item
            return (
              <View
                className="nav-item"
                key={path}
                onClick={handleNavItemClick(path)}
              >
                {name}
              </View>
            )
          })}
        </View>
      </AtDrawer>
    </View>
  )
}

export default NavBar

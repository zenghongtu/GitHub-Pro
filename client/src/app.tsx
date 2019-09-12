import "@tarojs/async-await"
import Taro, { Component, Config } from "@tarojs/taro"
import Index from "./pages/trending/index"

import '@/assets/iconfont/icon.css'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      "pages/trending/index",
      "pages/activity/index",
      "pages/repos/content/index",
      "pages/repos/index",
      "pages/repos/files/index",
      "pages/profile/index",
      "pages/starred/index",
      "pages/login/index",
      "pages/my-languages/index"
    ],
    window: {
      navigationStyle: "custom",
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "GitHub Pro",
      navigationBarTextStyle: "black",
      enablePullDownRefresh: true
    },
    cloud: true
  }

  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      const env = process.env.ClOUD_ENV
      Taro.cloud.init({ env, traceUser: true })
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById("app"))

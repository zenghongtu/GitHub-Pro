import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/trending/index'

import '@/assets/iconfont/icon.css'
import './app.scss'
import { githubHttpsUrl, parseGitHub, getNavPath } from './utils/repo'

import { Provider } from '@tarojs/redux'

import configStore from './store'

const store = configStore()

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
      'pages/trending/index',
      'pages/news/index',
      'pages/activity/repo',
      'pages/activity/index',
      'pages/developer/index',
      'pages/profile/index',
      'pages/profile/issues',
      'pages/repos/search/index',
      'pages/login/index',
      'pages/repos/index',
      'pages/my-languages/index',
      'pages/repos/contributors/index',
      'pages/repos/forks/index',
      'pages/repos/stars/index',
      'pages/repos/watchs/index',
      'pages/commits/index',
      'pages/repos/content/index',
      'pages/issues/index',
      'pages/issues/create-comment/index',
      'pages/issues/create-issue/index',
      'pages/issues/issue-detail/index',
      'pages/developer/followers/index',
      'pages/developer/following/index',
      'pages/developer/repos/index',
      'pages/developer/starred/index',
      'pages/repos/files/index',
      'pages/starred/index'
    ],
    window: {
      navigationStyle: 'default',
      backgroundColor: '#f3f3f3',
      backgroundTextStyle: 'dark',
      navigationBarTitleText: 'GitHub Pro',
      navigationBarBackgroundColor: '#fafafa',
      navigationBarTextStyle: 'black',
      backgroundColorTop: '#fafafa',
      backgroundColorBottom: '#fafafa',
      enablePullDownRefresh: true
    },
    tabBar: {
      backgroundColor: '#fafafa',
      position: 'bottom',
      borderStyle: 'white',
      color: '#8499a5',
      selectedColor: '#007afb',
      list: [
        {
          pagePath: 'pages/trending/index',
          iconPath: './assets/icons/trending.png',
          selectedIconPath: './assets/icons/trending_active.png',
          text: 'Trending'
        },
        {
          pagePath: 'pages/news/index',
          iconPath: './assets/icons/news.png',
          selectedIconPath: './assets/icons/news_active.png',
          text: 'News'
        },
        {
          pagePath: 'pages/starred/index',
          iconPath: './assets/icons/star.png',
          selectedIconPath: './assets/icons/star_active.png',
          text: 'Starred'
        },
        {
          pagePath: 'pages/repos/search/index',
          iconPath: './assets/icons/search.png',
          selectedIconPath: './assets/icons/search_active.png',
          text: 'Search'
        },
        {
          pagePath: 'pages/profile/index',
          iconPath: './assets/icons/github.png',
          selectedIconPath: './assets/icons/github_active.png',
          text: 'Profile'
        }
      ]
    },
    cloud: true
  }

  componentWillMount() {
    // TODO by path
    // const { path, query, scene } = this.$router.params
  }

  componentDidMount() {
    this.updateApp()
    Taro.getClipboardData({
      success(res) {
        const data = res.data as string
        if (data && data.startsWith(githubHttpsUrl)) {
          const [owner, repo, filePath] = parseGitHub(data)
          const url = getNavPath({ owner, filePath, repo })
          if (url) {
            Taro.navigateTo({ url })
          }
        }
      }
    })

    // no use
    // if (process.env.TARO_ENV === 'weapp') {
    //   const env = process.env.ClOUD_ENV
    //   Taro.cloud.init({ env, traceUser: true })
    // }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  updateApp() {
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log('hasUpdate: ', res.hasUpdate)
      })
      updateManager.onUpdateReady(function() {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(function() {
        // 新的版本下载失败
        Taro.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
        })
      })
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

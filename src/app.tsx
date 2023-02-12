import '@/assets/iconfont/icon.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Taro from '@tarojs/taro';
import { Component } from 'react';
import { Provider } from 'react-redux';
import './app.scss';
import configStore from './store';

const store = configStore();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: (attempt) => attempt * 2000,
      staleTime: 10,
    },
  },
});

class App extends Component<any> {
  componentWillMount() {
    // TODO by path
    // const { path, query, scene } = this.$router.params
  }

  componentDidMount() {
    this.updateApp();
    // Taro.getClipboardData({
    //   success(res) {
    //     const data = res.data as string;
    //     if (data && data.startsWith(githubHttpsUrl)) {
    //       const [owner, repo, filePath] = parseGitHub(data);
    //       const url = getNavPath({ owner, filePath, repo });
    //       if (url) {
    //         Taro.navigateTo({ url });
    //       }
    //     }
    //   },
    // });

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
      const updateManager = Taro.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log('hasUpdate: ', res.hasUpdate);
      });
      updateManager.onUpdateReady(function () {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
        Taro.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
        });
      });
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {this.props.children}
        </QueryClientProvider>
      </Provider>
    );
  }
}

export default App;

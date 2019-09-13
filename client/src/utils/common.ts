import Taro from '@tarojs/taro'

export const showLoginTips = () => {
  Taro.showModal({
    title: 'Unable to view',
    content: 'This page requires login to view, Do you want to login?',
    success(res) {
      if (res.confirm) {
        Taro.navigateTo({ url: '/pages/login/index' })
      } else if (res.cancel) {
      }
    }
  })
}

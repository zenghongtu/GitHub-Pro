import Taro from '@tarojs/taro'

let isShoTip = false
export const showLoginTips = () => {
  if (isShoTip) {
    return
  }
  isShoTip = true
  Taro.showModal({
    title: 'Login Required',
    content: 'This page requires login. Do you want to login?',
    cancelText: 'No',
    cancelColor: '#fb3e3b',
    confirmText: 'Ok',
    confirmColor: '#007afb',
    success(res) {
      if (res.confirm) {
        Taro.navigateTo({ url: '/pages/login/index' })
      } else if (res.cancel) {
      }
      isShoTip = false
    }
  })
}

export const copyText = (text: string) => {
  Taro.setClipboardData({
    data: `${text}`,
    // @ts-ignore
    success: function(res) {
      Taro.showToast({
        title: `Copy link: ${text}`,
        icon: 'none',
        mask: true
      })
    }
  })
}

export const getUniqueId = () => {
  return Math.random()
    .toString(36)
    .substr(2)
}

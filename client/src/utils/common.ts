import Taro from '@tarojs/taro'

export const showLoginTips = () => {
  Taro.showModal({
    title: 'Login Required',
    content: 'This page requires login to view, Do you want to login?',
    cancelText: 'No',
    cancelColor: '#fb3e3b',
    confirmText: 'Ok',
    confirmColor: '#007afb',
    success(res) {
      if (res.confirm) {
        Taro.navigateTo({ url: '/pages/login/index' })
      } else if (res.cancel) {
      }
    }
  })
}

export const copyText = (text: string) => {
  Taro.setClipboardData({
    data: `${text}`,
    // @ts-ignore
    success: function(res) {
      Taro.showToast({
        title: `Copy Success`,
        icon: 'success'
      })
    }
  })
}

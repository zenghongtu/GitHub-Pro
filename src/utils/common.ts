import Taro from '@tarojs/taro';

let isShoTip = false;
export const showLoginTips = () => {
  if (isShoTip) {
    return;
  }
  isShoTip = true;
  Taro.showModal({
    title: '是否前往登录?',
    content: '该页面操作需要登录才能操作',
    cancelText: 'No',
    cancelColor: '#fb3e3b',
    confirmText: 'Yes',
    confirmColor: '#007afb',
    success(res) {
      if (res.confirm) {
        Taro.navigateTo({ url: '/pages/login/index' });
      } else if (res.cancel) {
      }
      isShoTip = false;
    },
  });
};

export const copyText = async (text: string) => {
  const { data } = await Taro.setClipboardData({
    data: `${text}`,
  });
  Taro.showToast({
    title: `复制成功:${text}`,
    icon: 'none',
    mask: true,
  });
};

export const getUniqueId = () => {
  return Math.random().toString(36).substr(2);
};

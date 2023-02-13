import FabButton from '@/components/fab-button';
import Taro, { usePageScroll } from '@tarojs/taro';
import { useState } from 'react';

const usePageScrollBackToTop = () => {
  const [visible, setVisible] = useState(false);

  usePageScroll((res) => {
    if (res.scrollTop > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return visible ? (
    <FabButton
      onClick={() => Taro.pageScrollTo({ scrollTop: 0 })}
      icon="chevron-up"
    ></FabButton>
  ) : null;
};

export default usePageScrollBackToTop;

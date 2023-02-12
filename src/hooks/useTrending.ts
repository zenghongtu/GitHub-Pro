import { TRENDING_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import Taro from '@tarojs/taro';
import { TrendingRepoData, TrendingRequestParams } from 'types/trending';

const useTrending = ({
  type = 'repositories',
  ...params
}: TrendingRequestParams) => {
  return useQuery<TrendingRepoData[]>(
    ['trending', type, params],
    () => {
      // Taro.showLoading({ title: '努力加载中...' });
      return Taro.request({
        url: `${TRENDING_URL}/${type}`,
        data: params,
        method: 'GET',
      }).then((rsp) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        return rsp.data;
      });
    },
    { cacheTime: 60 * 60 * 10 },
  );
};

export default useTrending;

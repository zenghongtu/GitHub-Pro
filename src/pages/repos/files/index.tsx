import useRequest from '@/hooks/useRequest';
import { File, getContents } from '@/services/repos';
import { bytesToSize } from '@/utils/size';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect } from 'react';
import { AtList, AtListItem } from 'taro-ui';
import './index.scss';

const Files = () => {
  const {
    params: { owner, repo, url },
  } = useRouter();
  let full_url: string;
  if (url) {
    full_url = '/repos/' + url.split('repos/')[1];
  } else {
    full_url = `/repos/${owner}/${repo}/contents`;
  }

  const [files, refresh] = useRequest<File[] | null>(full_url, getContents);
  // TODO sort by name & type

  useEffect(() => {
    const title = full_url.split('repos/')[1].replace('/contents', '');
    Taro.setNavigationBarTitle({ title });
  }, []);

  const handleNavTo = (url: string, isFolder: boolean) => () => {
    let target_url: string;
    if (isFolder) {
      target_url = `/pages/repos/files/index?url=${url}`;
    } else {
      target_url = `/pages/repos/content/index?url=${url}`;
    }
    Taro.navigateTo({ url: target_url });
  };
  return (
    <View>
      <View className="files-wrap">
        <AtList hasBorder={false}>
          {files &&
            files.map((item) => {
              const { name, path, type, download_url, url, size } = item;
              // TODO check file type to open files or content
              const isFolder = type === 'dir';
              return (
                <View key="url" className="file-item">
                  <AtListItem
                    className="file"
                    hasBorder={false}
                    title={`${isFolder ? `🗂️` : `📄`}${name}`}
                    onClick={handleNavTo(url, isFolder)}
                    arrow={isFolder ? 'right' : undefined}
                    extraText={isFolder ? '' : `${bytesToSize(size)}`}
                  ></AtListItem>
                </View>
              );
            })}
        </AtList>
      </View>
    </View>
  );
};

export default Files;

import Empty from '@/components/empty';
import Markdown from '@/components/markdown';
import useRequest from '@/hooks/useRequest';
import { getRawContent } from '@/services/repos';
import { getCodeMarkup, isImageFile } from '@/utils/repo';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect } from 'react';
import './index.scss';

const Content = () => {
  const {
    params: { url },
  } = useRouter();
  if (!url) {
    return null;
  }
  const full_file_path = url.split('repos/')[1];

  const [rawContent, refreshContent] = useRequest<string | null>(
    full_file_path,
    getRawContent,
  );

  useEffect(() => {
    const title = full_file_path.replace('/contents', '');
    Taro.setNavigationBarTitle({ title });
  }, []);

  if (!rawContent) {
    return <Empty></Empty>;
  }

  const file_url = url.split('?')[0];
  let content = rawContent;

  // stringify object
  if (typeof rawContent === 'object') {
    content = JSON.stringify(rawContent, null, 2);
  }

  if (isImageFile(file_url)) {
    content = '![](' + file_url + ')';
  } else {
    const markup = getCodeMarkup(file_url);

    if (file_url.endsWith('ipynb')) {
      // TODO
    } else if (markup) {
      content = '```' + markup + '\n' + content + '\n```';
    }
  }

  return (
    <View>{<Markdown md={content} full_name={full_file_path}></Markdown>}</View>
  );
};

Content.config = {
  enablePullDownRefresh: false,
};

export default Content;

import { showLoginTips } from '@/utils/common';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AtButton, AtTextarea } from 'taro-ui';
import { createIssueComment } from '../../../services/issues';
import './index.scss';

const CreateComment = () => {
  const {
    params: { full_name, number },
  } = useRouter();
  if (!full_name) {
    return;
  }

  const username = useSelector<any, any>((state) => state.user.username);
  if (!username) {
    showLoginTips();
  }

  const [content, setContent] = useState('');

  useEffect(() => {
    const title = full_name;
    Taro.setNavigationBarTitle({ title });
  }, []);
  const handleTextareaChange = (ev) => {
    setContent(ev.target.value);
  };
  const handleConfirm = () => {
    const data = {
      body: content,
    };

    createIssueComment({ full_name, number }, data).then((res) => {
      if (res && res.body === content) {
        Taro.showToast({ title: 'Success', icon: 'success' });
        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
    });
  };

  return (
    <View className="wrap">
      <View className="content">
        <AtTextarea
          height={400}
          count={false}
          maxLength={10000}
          value={content}
          onChange={handleTextareaChange}
          placeholder="Leave a comment"
        />
      </View>
      <AtButton className="confirm" type="primary" onClick={handleConfirm}>
        Comment
      </AtButton>
    </View>
  );
};

export default CreateComment;

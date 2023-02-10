import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AtButton, AtInput, AtTextarea } from 'taro-ui';
import { createIssue } from '../../../services/issues';
import { showLoginTips } from '../../../utils/common';
import styles from './index.module.scss';

const CreateIssue = () => {
  const {
    params: { full_name },
  } = useRouter();
  if (!full_name) {
    return;
  }

  const username = useSelector<any, any>((state) => state.user.username);
  if (!username) {
    showLoginTips();
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const title = full_name;
    Taro.setNavigationBarTitle({ title });
  }, []);

  const handleChange = (val: string) => {
    setTitle(val);
  };
  const handleTextareaChange = (ev) => {
    setContent(ev.target.value);
  };
  const handleConfirm = () => {
    const data = {
      title: title,
      body: content,
    };
    createIssue({ full_name }, data).then((data) => {
      if (data && data.title === title) {
        Taro.showToast({ title: 'Success', icon: 'success' });
        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
    });
  };

  // TODO add preview
  return (
    <View className={styles.wrap}>
      <View className={styles.title}>
        <AtInput
          name="title"
          title=""
          type="text"
          placeholder="Title"
          value={title}
          border={false}
          onChange={handleChange}
        />
      </View>
      <View className={styles.content}>
        <AtTextarea
          height={400}
          count={false}
          maxLength={10000}
          value={content}
          onChange={handleTextareaChange}
          placeholder="Leave a comment"
        />
      </View>
      <AtButton
        className={styles.confirm}
        type="primary"
        onClick={handleConfirm}
      >
        Submit new issue
      </AtButton>
    </View>
  );
};

export default CreateIssue;

import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';
import { AtIcon, AtRadio } from 'taro-ui';
import styles from './index.module.scss';

export const defaultLang = '';

interface LanguageProps {
  onChangeLang: (params: { language: string; title: string }) => void;
  curLang: string;
}

const Language = ({ onChangeLang, curLang }: LanguageProps) => {
  const langs = useSelector<any, any>((state) => state.lang.selected);

  const handleLangClick = (lang, e) => {
    const value = langs.find((item) => item.language === lang);
    onChangeLang(value);
  };

  const handleIconClick = () => {
    Taro.navigateTo({ url: '/pages/my-languages/index' });
  };

  return (
    <View className={styles.wrap}>
      <View className={styles.title}>
        <Text>Favorite languages</Text>
        <AtIcon size={18} value="edit" onClick={handleIconClick}></AtIcon>
      </View>
      <View className={styles['lang-list']}>
        <AtRadio
          options={langs.map((item) => ({
            label: item.title,
            value: item.language,
          }))}
          value={curLang}
          onClick={handleLangClick}
        />
      </View>
    </View>
  );
};

export default Language;

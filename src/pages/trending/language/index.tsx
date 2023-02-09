import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';
import { AtIcon } from 'taro-ui';
import './index.scss';

export const defaultLang = '';

interface LanguageProps {
  onChangeLang: (params: { language: string; title: string }) => void;
  curLang: string;
}

const Language = ({ onChangeLang, curLang }: LanguageProps) => {
  const langs = useSelector<any, any>((state) => state.lang.selected);

  const handleLangClick = (e) => {
    const { dataset } = e.target;
    onChangeLang(dataset);
  };

  const handleIconClick = () => {
    Taro.navigateTo({ url: '/pages/my-languages/index' });
  };

  const activeClassName = '.active';
  return (
    <View className="wrap">
      <View className="title">
        <Text>My languages</Text>
        <AtIcon size={18} value="edit" onClick={handleIconClick}></AtIcon>
      </View>
      <View className="lang-list">
        {langs.map((lang) => {
          const { title, language } = lang;

          return (
            <View
              key={language}
              data-title={title}
              data-language={language}
              onClick={handleLangClick}
              className={`lang-item ${
                language === curLang ? activeClassName : ''
              }`}
            >
              {title}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Language;

import { UPDATE_SELECTED_LANGS } from '@/store/constatnts';
import { Input, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AtCheckbox } from 'taro-ui';
import FabButton from '../../components/fab-button';
import { LanguageParams } from '../trending';
import styles from './index.module.scss';
import LANGUAGE_LIST from './languages';

interface OptionsLang {
  value: string;
  label: string;
}

const MyLanguages = () => {
  const langs = useSelector<any, any>((state) => state.lang.selected);
  const initSelectedList = langs.map((lang) => lang.language);

  const [optionsLangs, setOptionsLangs] =
    useState<OptionsLang[]>(LANGUAGE_LIST);
  const [selectedList, setSelectedList] = useState<string[]>(initSelectedList);
  const [fiterVal, setFilterVal] = useState<string>('');
  const dispatch = useDispatch();

  const handleSeletedChange = (val) => {
    setSelectedList(val);
  };

  const handleChangeInput = (e) => {
    const val = e.target.value;
    setFilterVal(val);

    const _langs = LANGUAGE_LIST.filter((_lang) => _lang.value.includes(val));
    setOptionsLangs(_langs);
  };

  const handleFabClick = () => {
    const languages = LANGUAGE_LIST.reduce<LanguageParams[]>(
      (result, { value, label }) => {
        // TODO 按顺序排
        if (selectedList.includes(value)) {
          result.push({ language: value, title: label });
        }
        return result;
      },
      [],
    );

    dispatch({
      type: UPDATE_SELECTED_LANGS,
      payload: languages,
    });
    Taro.navigateBack();
  };

  return (
    <View className={styles.wrap}>
      <View>
        <Input
          focus
          placeholder="Search"
          className={styles['filter-input']}
          value={fiterVal}
          onInput={handleChangeInput}
        ></Input>
      </View>
      <View>
        <AtCheckbox
          options={optionsLangs}
          selectedList={selectedList}
          onChange={handleSeletedChange}
        ></AtCheckbox>
      </View>
      <FabButton icon="check" onClick={handleFabClick}></FabButton>
    </View>
  );
};
MyLanguages.config = {
  navigationBarTitleText: 'My Languages',
};
export default MyLanguages;

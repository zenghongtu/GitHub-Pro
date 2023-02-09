import Taro from '@tarojs/taro';
import { UPDATE_SELECTED_LANGS } from '../constatnts';
import { IAction } from '../reducers';

export interface Language {
  language: string;
  title: string;
}

const defaultLangs: Language[] = [
  {
    language: '',
    title: 'All Languages',
  },
  {
    language: 'java',
    title: 'Java',
  },
  {
    language: 'javascript',
    title: 'JavaScript',
  },
  {
    language: 'typescript',
    title: 'TypeScript',
  },
];
interface ILangState {
  // current: string
  selected: Language[];
}

const INITIAL_STATE: ILangState = {
  // current: Taro.getStorageSync('current') || '',
  selected: Taro.getStorageSync('selected') || defaultLangs,
};

const languageReducer = (state = INITIAL_STATE, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SELECTED_LANGS:
      Taro.setStorageSync('selected', payload);
      return { ...state, selected: payload };
    // case UPDATE_CURRENT_LANG:
    //   Taro.setStorageSync('current', payload)
    //   return { ...state, current: payload }
    default:
      return state;
  }
};

export default languageReducer;

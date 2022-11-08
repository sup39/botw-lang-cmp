export const defaultLang = 'en-US';

export const lskey$lang = '$lang';
export const $lang0 = localStorage.getItem(lskey$lang) ?? defaultLang;
export function setLang($lang: string) {
  localStorage.setItem(lskey$lang, $lang);
  document.documentElement.lang = $lang;
}

// assert label of defaultLang is specified
export type I18N<T> =
  {[lang: string]: T} & {[lang in typeof defaultLang]: T};

const _i18nLabels = {
  'displayLang': {
    'en-US': 'Display Language',
    'ja-JP': '表示言語',
  },
  'timeFormat': {
    'en-US': 'Time Format',
    'ja-JP': 'タイムフォーマット',
  },
};
export const i18nLabels: {[id in keyof typeof _i18nLabels]: I18N<string>}
  = _i18nLabels;

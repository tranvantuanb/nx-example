import { ButtonType } from 'antd/lib/button';

export type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'active';

export type ButtonThemeType = ButtonType;

export type ButtonThemeTypeConfig = {
  colorText: string;
  colorBg: string;
  colorGhost: string;
};

export type ButtonThemeConfig = {
  [key in ButtonTheme]: {
    [key in ButtonThemeType]?: ButtonThemeTypeConfig;
  };
};

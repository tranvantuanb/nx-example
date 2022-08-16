import { theme } from 'twin.macro';

import { ButtonTheme, ButtonThemeType, ButtonThemeConfig } from './interfaces';

const THEME_CONFIG: ButtonThemeConfig = {
  primary: {
    default: {
      colorText: 'var(--text-color)',
      colorBg: 'var(--secondary-color)',
      colorGhost: 'var(--text-color)',
    },
    primary: {
      colorText: '#EFF2FE',
      colorBg: 'var(--primary-color)',
      colorGhost: 'var(--primary-color)',
    },
  },
  secondary: {
    default: {
      colorText: 'var(--text-color)',
      colorBg: 'var(--secondary-color)',
      colorGhost: 'var(--text-color)',
    },
    primary: {
      colorText: 'var(--primary-color)',
      colorBg: 'var(--primary-light-color)',
      colorGhost: 'var(--primary-color)',
    },
  },
  success: {
    primary: {
      colorText: '#FFF',
      colorBg: 'var(--success-color)',
      colorGhost: 'var(--success-color)',
    },
  },
  danger: {
    primary: {
      colorText: '#FFF',
      colorBg: 'var(--danger-color)',
      colorGhost: 'var(--danger-color)',
    },
  },
  active: {
    primary: {
      colorText: '#FFF',
      colorBg: theme('colors.blue.600'),
      colorGhost: theme('colors.blue.600'),
    },
  },
};

export const getThemeColors = ({
  theme,
  type,
}: {
  theme: ButtonTheme;
  type: ButtonThemeType;
}) => {
  const _theme = THEME_CONFIG[theme] || THEME_CONFIG.primary;

  if (['text', 'link'].includes(type)) {
    return {
      colorText: _theme.primary?.colorGhost,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return (_theme[type] || _theme.primary)!;
};

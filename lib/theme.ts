import { Platform, TextStyle, ViewStyle } from 'react-native';

/** MediKiosk design tokens - clean clinical white with blue + teal accents. */
export const colors = {
  canvas: '#F1F6FC',
  surface: '#FFFFFF',
  surfaceAlt: '#F7FAFD',
  border: '#E2EAF3',
  borderStrong: '#CBD9E7',
  ink: '#0B1B2B',
  inkSoft: '#4C5F72',
  inkFaint: '#8397A9',
  primary: '#0E63E4',
  primaryDark: '#0A4CB0',
  primarySoft: '#E9F1FE',
  teal: '#0FA3A3',
  tealDark: '#0A7C7C',
  tealSoft: '#E1F6F5',
  danger: '#C8202F',
  dangerDark: '#8F1622',
  dangerSoft: '#FCECEE',
  amber: '#8F5300',
  amberSoft: '#FFF3DF',
  success: '#0F7A52',
  successSoft: '#E3F6EE',
  violet: '#5B4BE0',
  violetSoft: '#EEEBFE',
  white: '#FFFFFF',
};

export const radii = { sm: 10, md: 14, lg: 20, xl: 28, pill: 999 };

export const space = (n: number) => n * 8;

export const shadow = {
  none: {} as ViewStyle,
  sm: {
    shadowColor: '#0B1B2B',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  } as ViewStyle,
  md: {
    shadowColor: '#0B1B2B',
    shadowOpacity: 0.09,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  } as ViewStyle,
  lg: {
    shadowColor: '#0B1B2B',
    shadowOpacity: 0.14,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  } as ViewStyle,
};

export const type = {
  display: { fontSize: 40, fontWeight: '800', letterSpacing: -1, color: colors.ink, lineHeight: 46 } as TextStyle,
  h1: { fontSize: 30, fontWeight: '800', letterSpacing: -0.6, color: colors.ink, lineHeight: 37 } as TextStyle,
  h2: { fontSize: 23, fontWeight: '700', letterSpacing: -0.3, color: colors.ink, lineHeight: 30 } as TextStyle,
  h3: { fontSize: 18, fontWeight: '700', color: colors.ink, lineHeight: 24 } as TextStyle,
  body: { fontSize: 16, fontWeight: '400', color: colors.inkSoft, lineHeight: 24 } as TextStyle,
  bodyInk: { fontSize: 16, fontWeight: '500', color: colors.ink, lineHeight: 24 } as TextStyle,
  small: { fontSize: 14, fontWeight: '500', color: colors.inkSoft, lineHeight: 20 } as TextStyle,
  micro: { fontSize: 12, fontWeight: '700', color: colors.inkFaint, letterSpacing: 0.6, lineHeight: 16 } as TextStyle,
};

export const timing = { fast: 220, normal: 380, slow: 620 };

export const CONTENT_MAX_WIDTH = 1240;

import { useWindowDimensions } from 'react-native';

export interface Layout {
  /** true for desktop / landscape tablet - side-by-side split layouts */
  isWide: boolean;
  /** true from tablet portrait upwards */
  isTablet: boolean;
  width: number;
  height: number;
  /** horizontal page gutter */
  gutter: number;
  /** number of columns for card grids */
  columns: number;
}

export function useLayout(): Layout {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 960;
  const isTablet = width >= 700;
  return {
    isWide,
    isTablet,
    width,
    height,
    gutter: isWide ? 28 : isTablet ? 24 : 18,
    columns: isWide ? 3 : isTablet ? 2 : 1,
  };
}

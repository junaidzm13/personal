const GRAY_4 = '#999999' as const;
const SURFACE = '#1e1e1e' as const;
const SURFACE_6DP = '#2c2c2c' as const;
const SURFACE_24DP = '#383838' as const;
const PRIMARY = '#b2b2b2' as const;
const BACKGROUND = '#121212' as const;
const WHITE = '#FFFFFF' as const;
const BLACK = '#000000' as const;

export const colors = {
  GRAY_4,
  PRIMARY,
  SURFACE,
  SURFACE_6DP,
  SURFACE_24DP,
  BACKGROUND,
  ON_SURFACE: WHITE,
  ON_PRIMARY: BLACK,
} as const;

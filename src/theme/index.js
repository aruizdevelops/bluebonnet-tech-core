import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import components from './components';

export function createCoreTheme(overrides = {}) {
  const {
    palette: paletteOverrides = {},
    typography: typographyOverrides = {},
    components: componentOverrides = {},
    ...rest
  } = overrides;

  return createTheme({
    palette: { ...palette, ...paletteOverrides },
    typography: { ...typography, ...typographyOverrides },
    components: { ...components, ...componentOverrides },
    shape: {
      borderRadius: 10,
    },
    ...rest,
  });
}

export const defaultTheme = createCoreTheme();

export { default as palette } from './palette';
export { default as typography } from './typography';
export { default as components } from './components';

import * as presets from 'hypostyle/presets'

export const theme = {
  ...presets,
  tokens: {
    ...presets.tokens,
    color: {
      dark: '#223355',
      accent: '#4488FF',
      light: '#DBE2EE'
    },
    fontFamily: {
      mono: `'IBM Plex Mono', monospace`,
      sans: `'IBM Plex Sans', sans-serif`
    }
  }
}

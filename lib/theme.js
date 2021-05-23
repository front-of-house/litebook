const presets = require('hypostyle/presets')

const theme = {
  ...presets,
  tokens: {
    ...presets.tokens,
    color: {
      dark: '#223355',
      accent: '#4488FF',
      medium: '#C2D0E8',
      light: '#DBE2EE'
    },
    fontFamily: {
      mono: `'IBM Plex Mono', monospace`,
      sans: `'IBM Plex Sans', sans-serif`
    }
  }
}

module.exports = { theme }

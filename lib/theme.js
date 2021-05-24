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
      sans: `'IBM Plex Sans', -apple-system, system-ui, BlinkMacSystemFont, sans-serif`
    },
    fontSize: [
      '3rem',
      '3rem',
      '2.2rem',
      '1.6rem',
      '1.2rem',
      '1rem',
      '0.875rem'
    ],
    lineHeight: ['1.1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.5']
  }
}

module.exports = { theme }

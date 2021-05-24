const styles = {
  'html, body': {
    fs: '100%',
    ff: 'sans',
    color: 'dark'
  },
  '*, *::before, *::after': {
    m: 0,
    boxSizing: 'border-box',
    '-moz-osx-font-smoothing': 'grayscale'
  },
  '::selection': {
    bg: 'accent'
  },
  'a, button, [role="button"], input, label, select, textarea': {
    touchAction: 'manipulation'
  },
  button: {
    bg: 'transparent',
    border: 0,
    outline: 0,
    cursor: 'pointer'
  },
  a: {
    c: 'accent',
    textDecoration: 'none',
    '&:visited': {
      c: 'accent'
    },
    '&:focus, &:hover': {
      textDecoration: 'underline'
    },
    '&:focus': {
      outline: '2px dashed',
      outlineColor: 'accent',
      outlineOffset: '4px'
    }
  },
  h1: {
    fs: '3rem',
    lh: '1.1'
  },
  h2: {
    fs: '2.2rem',
    lh: '1.2'
  },
  h3: {
    fs: '1.6rem',
    lh: '1.3'
  },
  h4: {
    fs: '1.2rem',
    lh: '1.4'
  },
  h5: {
    fs: '1rem',
    lh: '1.5'
  },
  h6: {
    fs: '0.875rem',
    lh: '1.5'
  },
  'p, .p': {
    fs: '1rem',
    lh: '1.6'
  },
  '.markdown': {
    'h1, h2, h3, h4, h5, h6': {
      mt: '1.5rem',
      mb: '0.75rem',
      '&:first-child': {
        mt: 0
      },
      '&:last-child': {
        mb: 0
      },
      '&:hover': {
        span: {
          opacity: 0.2
        }
      },
      a: {
        span: {
          abs: true,
          transform: 'translateX(-100%)',
          px: 2,
          opacity: 0,
          '&:hover': {
            opacity: 1
          },
          '&::after': {
            content: '"#"',
            display: 'block',
            fs: 'inherit',
            c: 'accent'
          }
        }
      }
    },
    p: {
      mb: 4,
      '&:first-child': {
        mt: 0
      },
      '&:last-child': {
        mb: 0
      }
    },
    'ul, ol': {
      pl: 4,
      lineHeight: '1.5',
      my: 4,
      'ul, ol': {
        paddingLeft: 6,
        my: 0
      },
      li: {}
    },
    blockquote: {
      position: 'relative',
      my: '1rem',
      py: 4,
      px: 6,
      overflow: 'auto',
      bg: 'white',
      borderRadius: '6px',
      border: '2px solid',
      borderColor: 'accent'
    },
    'pre, code': {
      ff: 'mono',
      fs: 'inherit',
      display: 'inline-block',
      c: 'white'
    },
    code: {
      p: 0,
      bg: 'light',
      c: 'dark'
    },
    pre: {
      my: '1rem',
      w: 1
    },
    'pre code': {
      bg: '#2E3440',
      c: '#D8DEE9',
      overflow: 'auto',
      py: 4,
      px: 6,
      w: 1,
      borderRadius: '6px'
    },
    "pre code[class*='hljs']": {},
    table: {
      d: 'block',
      w: 1, // keep for backwards compatibility
      width: 'min-content',
      maxWidth: '100%',
      overflow: 'auto',
      borderCollapse: 'collapse',
      'th, td': {
        p: 3,
        border: '1px solid',
        borderColor: 'medium'
      },
      th: {
        fw: 'bold',
        py: 4
      },
      tr: {
        bg: 'white',
        borderTop: '1px solid',
        borderColor: 'medium',
        '&:nth-child(2n)': {
          bg: 'light'
        }
      },
      img: {
        bg: 'transparent'
      }
    }
  }
}

module.exports = { styles }

const { h } = require('hyposcript')
const { Box } = require('hypobox')

const { Sun } = require('./icons/Sun')
const { Menu } = require('./icons/Menu')
const { Zap } = require('./icons/Zap')

function Tag ({ children, ...props }) {
  return h(
    Box,
    {
      className: 'version',
      py: '2px',
      px: '4px',
      bg: 'accent',
      c: 'white',
      fw: 'bold',
      lh: '1.0',
      borderRadius: '4px',
      mr: 8,
      fs: '0.75rem',
      ...props,
      cx: {
        whiteSpace: 'nowrap'
      }
    },
    children
  )
}

function NavLink ({ link }) {
  const disabled = link.sidebar_disabled
  return h(
    Box,
    {
      as: 'li',
      mt: 3,
      f: true,
      aic: true,
      cx: { '&:first-child': { mt: 0 } }
    },
    [
      h(
        Box,
        {
          as: disabled ? 'span' : 'a',
          href: disabled ? null : link.url,
          mr: 2,
          fs: 5,
          lh: '1.0',
          pb: '2px'
        },
        link.sidebar_title
      ),
      link.sidebar_pill &&
        Tag({ children: link.sidebar_pill, bg: 'light', c: 'dark' })
    ]
  )
}

function App ({ pages, content, logo, version }) {
  return h(
    Box,
    {
      className: 'outer',
      f: true,
      rel: true,
      h: '100vh',
      overflow: 'hidden'
    },
    [
      h(
        Box,
        {
          as: 'header',
          f: true,
          position: ['fixed', 'fixed', 'relative'],
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'column',
          minWidth: 'max-content',
          overflow: 'auto',
          z: 1,
          bg: 'white',
          h: ['auto', 'auto', '100vh'],
          cx: {
            borderBottom: { 0: '1px solid', 2: 'none' },
            borderRight: { 0: 'none', 2: '1px solid' },
            borderColor: 'light',
            '-webkit-overflow-scrolling': 'touch'
          }
        },
        [
          h(
            Box,
            {
              as: 'nav',
              f: true,
              aic: true,
              jcb: true,
              px: [4, 6, 8],
              h: [60, 60, 80]
            },
            [
              h(Box, { f: true, aic: true }, [
                h(
                  Box,
                  {
                    className: 'logo',
                    as: 'a',
                    href: '/',
                    mr: 4,
                    lh: '1.0'
                  },
                  [logo || h(Zap)]
                ),
                version && Tag({ children: version })
              ]),
              h(
                Box,
                {
                  f: true,
                  aic: true
                },
                [
                  h(
                    Box,
                    {
                      as: 'button',
                      id: 'themeToggle',
                      title: 'Toggle dark mode (WIP)',
                      f: true,
                      aic: true,
                      jcc: true,
                      w: 40,
                      h: 40,
                      borderRadius: '4px',
                      lh: '1.0',
                      cx: {
                        '&:focus, &:hover': {
                          bg: 'light'
                        }
                      }
                    },
                    [h(Sun, { w: 20, h: 20 })]
                  ),
                  h(
                    Box,
                    {
                      as: 'button',
                      id: 'menuToggle',
                      title: 'Toggle menu',
                      f: true,
                      aic: true,
                      jcc: true,
                      w: 40,
                      h: 40,
                      ml: 2,
                      borderRadius: '4px',
                      d: ['block', 'block', 'none'],
                      lh: '1.0',
                      cx: {
                        '&:focus, &:hover': {
                          bg: 'light'
                        }
                      }
                    },
                    [h(Menu, { w: 20, h: 20 })]
                  )
                ]
              )
            ]
          ),
          h(
            Box,
            {
              as: 'ul',
              id: 'menu',
              m: 0,
              px: [4, 6, 8],
              pt: 2,
              pb: [3, 5, 7],
              overflow: 'auto',
              d: ['none', 'none', 'block !important'],
              cx: { listStyle: 'none' },
              h: { 0: 'calc(100vh - 60px)', 2: 'calc(100vh - 80px)' }
            },
            pages
              .map(link =>
                link.children
                  ? h(
                      Box,
                      {
                        as: 'li',
                        mt: 5,
                        cx: { '&:first-child': { mt: 0 } }
                      },
                      [
                        h(
                          Box,
                          { as: 'h5', cx: { textTransform: 'uppercase' } },
                          link.sidebar_title.replace(/([A-Z])|[-]/, ' $1')
                        ),
                        h(
                          Box,
                          {
                            as: 'ul',
                            mt: 3,
                            pl: 0,
                            cx: { listStyle: 'none' }
                          },
                          link.children.map(link => NavLink({ link }))
                        )
                      ]
                    )
                  : NavLink({ link })
              )
              .concat(
                h(Box, { as: 'li', h: 40 }) // for padding
              )
          )
        ]
      ),
      h(
        Box,
        {
          pt: 80,
          w: 1,
          rel: true,
          z: 0,
          overflow: 'auto',
          cx: {
            '-webkit-overflow-scrolling': 'touch'
          }
        },
        [
          h(
            Box,
            {
              px: [4, 6, 12],
              pb: [40, 60, 80]
            },
            [
              h(Box, { mxa: true, maxWidth: 800 }, [
                h('div', { className: 'markdown' }, content + '')
              ])
            ]
          )
        ]
      )
    ]
  )
}

module.exports = { App }

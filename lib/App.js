const { h } = require('hyposcript')
const { Box } = require('hypobox')

const { Sun } = require('./icons/Sun')
const { Menu } = require('./icons/Menu')
const { Zap } = require('./icons/Zap')

function App ({ pages, content, logo }) {
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
          minWidth: 240,
          overflow: 'auto',
          z: 1,
          bg: 'white',
          h: ['auto', 'auto', '100vh'],
          borderBottom: { 0: '1px solid', 2: 'none' },
          borderRight: { 0: 'none', 2: '1px solid' },
          borderColor: 'light',
          '-webkit-overflow-scrolling': 'touch'
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
              h(
                Box,
                {
                  as: 'a',
                  href: '/',
                  pr: 8
                },
                [logo || h(Zap)]
              ),
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
                      title: 'Toggle dark mode (WIP)',
                      f: true,
                      aic: true,
                      jcc: true,
                      w: 40,
                      h: 40,
                      borderRadius: '4px',
                      cx: {
                        '&:focus, &:hover': {
                          bg: 'light'
                        }
                      }
                    },
                    [h(Sun, { w: 16, h: 16 })]
                  ),
                  h(
                    Box,
                    {
                      as: 'button',
                      title: 'Toggle menu',
                      f: true,
                      aic: true,
                      jcc: true,
                      w: 40,
                      h: 40,
                      ml: 2,
                      borderRadius: '4px',
                      d: ['block', 'block', 'none'],
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
              cx: { listStyle: 'none' }
            },
            pages.map(link =>
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
                        { as: 'h4', textTransform: 'uppercase' },
                        link.sidebar_title.replace(/([A-Z])|[-]/, ' $1')
                      ),
                      h(
                        Box,
                        {
                          as: 'ul',
                          mt: 2,
                          pl: 0,
                          cx: { listStyle: 'none' }
                        },
                        link.children.map(link =>
                          h(
                            Box,
                            {
                              as: 'li',
                              mt: 1,
                              cx: { '&:first-child': { mt: 0 } }
                            },
                            [
                              h('p', {}, [
                                h(
                                  'a',
                                  {
                                    href: link.url
                                  },
                                  link.sidebar_title
                                )
                              ])
                            ]
                          )
                        )
                      )
                    ]
                  )
                : h(
                    Box,
                    {
                      as: 'li',
                      mt: 5,
                      cx: { '&:first-child': { mt: 0 } }
                    },
                    [
                      h('p', {}, [
                        h(
                          'a',
                          {
                            href: link.url
                          },
                          link.sidebar_title
                        )
                      ])
                    ]
                  )
            )
          )
        ]
      ),
      h(
        Box,
        {
          pt: [80, 80, 40],
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
              pt: [3, 5, 7],
              pb: [40, 60, 80]
            },
            [
              h(Box, { mxa: true, maxWidth: '800' }, [
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

import React from 'react'
import { Box } from '@hypobox/react'

import { Sun } from './icons/Sun'
import { Menu } from './icons/Menu'

export function App ({ pages, content, logo }) {
  return (
    <Box f position='relative' h='100vh' overflow='hidden'>
      <Box
        as='header'
        fix
        top
        left
        right
        f
        flexDirection='column'
        minWidth={240}
        overflow='auto'
        z={1}
        bg='white'
        cx={{
          borderRight: 'none',
          height: 'auto',
          borderBottom: '1px solid currentColor',
          '-webkit-overflow-scrolling': 'touch',
          '@media (min-width: 800px)': {
            height: '100vh',
            position: 'relative',
            borderRight: '1px solid currentColor'
          }
        }}
      >
        <Box as='nav' f aic jcb px={[4, 6, 8]} h={[60, 60, 80]}>
          <Box pr={8}>
            <a href='/'>{logo}</a>
          </Box>
          <Box f aic>
            <Box
              as='button'
              title='Toggle dark mode (WIP)'
              f
              aic
              jcc
              w={40}
              h={40}
              cx={{
                bg: 'transparent',
                border: 0,
                outline: 0,
                borderRadius: '4px',
                cursor: 'pointer',
                '&:focus, &:hover': {
                  bg: 'light'
                }
              }}
            >
              <Sun w={16} h={16} />
            </Box>
            <Box
              as='button'
              id='menuToggle'
              title='Toggle menu'
              f
              aic
              jcc
              ml={2}
              w={40}
              h={40}
              d={['block', 'block', 'none']}
              cx={{
                bg: 'transparent',
                border: 0,
                outline: 0,
                borderRadius: '4px',
                cursor: 'pointer',
                '&:focus, &:hover': {
                  bg: 'light'
                }
              }}
            >
              <Menu w={20} h={20} />
            </Box>
          </Box>
        </Box>
        <Box
          as='ul'
          id='menu'
          m={0}
          px={[4, 6, 8]}
          pt={2}
          pb={[3, 5, 7]}
          overflow='auto'
          d={['none', 'none', 'block !important']}
          cx={{
            listStyle: 'none',
            '@media screen and (min-width: 800px)': {
              borderBottom: 0
            }
          }}
        >
          {pages.map(link =>
            link.children ? (
              <Box
                as='li'
                key={link.sidebar_title}
                mt={5}
                cx={{ '&:first-child': { mt: 0 } }}
              >
                <Box as='h4' cx={{ textTransform: 'capitalize' }}>
                  {link.sidebar_title.replace(/([A-Z])|[-]/, ' $1')}
                </Box>

                <Box
                  as='ul'
                  mt={2}
                  pl={0}
                  cx={{
                    listStyle: 'none'
                  }}
                >
                  {link.children.map(link => (
                    <Box
                      as='li'
                      key={link.url}
                      mt={1}
                      cx={{ '&:first-child': { mt: 0 } }}
                    >
                      <Box as='p'>
                        <Box as='a' href={link.url}>
                          {link.sidebar_title}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box
                as='li'
                key={link.url}
                mt={1}
                cx={{ '&:first-child': { mt: 0 } }}
              >
                <Box as='p'>
                  <Box as='a' href={link.url}>
                    {link.sidebar_title}
                  </Box>
                </Box>
              </Box>
            )
          )}
        </Box>
      </Box>

      <Box
        pt={[80, 80, 40]}
        w
        rel
        z={0}
        overflow='auto'
        cx={{
          '-webkit-overflow-scrolling': 'touch'
        }}
      >
        <Box px={[4, 6, 12]} pt={[3, 5, 7]} pb={[40, 60, 80]}>
          <Box mxa maxWidth={800}>
            <Box
              className='wysiwyg'
              dangerouslySetInnerHTML={{
                __html: content
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

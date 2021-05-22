import { hypostyle } from 'hypostyle'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Hypo } from '@hypobox/react'
import { html } from 'presta/html'
import * as extract from 'presta/extract'

import { source } from './source'
import { theme as defaultTheme } from './theme'
import { styles as defaultStyles } from './styles'
import { App as DefaultApp } from './App'
import { Zap } from './icons/Zap'

export const theme = defaultTheme
export const styles = defaultStyles

export function litebook (
  baseDir,
  globs,
  {
    theme = defaultTheme,
    styles = defaultStyles,
    App = DefaultApp,
    logo = <Zap />
  } = {}
) {
  return file => {
    const { paths, sources } = source(baseDir, globs, file)

    return {
      getStaticPaths () {
        return paths.map(p => (p === '/index' ? '/' : p))
      },
      handler (props) {
        const { content, frontmatter = {} } = sources[
          props.path === '/' ? '/index' : props.path
        ]

        const pages = Object.keys(sources)
          .sort(
            (a, b) =>
              sources[a].frontmatter.order - sources[b].frontmatter.order
          ) // order
          .filter(url => url !== '/index') // filter out homepage
          .map(url => ({ url, ...sources[url].frontmatter })) // convert to link object
          .reduce((links, link) => {
            const [parent, child] = link.url.replace(/^\//, '').split('/')

            // non-category page
            if (!child) return links.concat(link)

            // find existing category
            const existingCategory = links.find(p => {
              return p.sidebar_title === parent
            })
            // or set default
            const category = existingCategory || {
              sidebar_title: parent,
              children: []
            }

            // push child link
            category.children.push({
              url: link.url,
              sidebar_title: link.sidebar_title
            })

            // update root pages if not exists
            if (!existingCategory) links.push(category)

            return links
          }, [])

        const hypo = hypostyle(theme)
        const globalStyles = (hypo.injectGlobal(styles), hypo.flush())

        const markup = renderToStaticMarkup(
          <Hypo hypostyle={hypo}>
            <App pages={pages} content={content} logo={logo} />
          </Hypo>
        )

        return {
          html: html({
            head: {
              title: frontmatter.meta_title || 'Litebook',
              link: [
                `<link href="https://unpkg.com/nord-highlightjs@0.1.0/dist/nord.css" rel="stylesheet" type="text/css" />`,
                {
                  rel: 'stylesheet',
                  href: extract.css(globalStyles, 'styles')
                },
                `<link rel="preconnect" href="https://fonts.gstatic.com">`,
                `<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">`
              ],
              style: [{ id: 'style', children: hypo.flush() }]
            },
            body: markup,
            foot: {
              script: [{ src: '/index.js' }]
            }
          })
        }
      }
    }
  }
}

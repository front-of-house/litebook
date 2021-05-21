import path from 'path'
import { hypostyle } from 'hypostyle'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Hypo } from '@hypobox/react'
import { html } from 'presta/html'
import * as extract from 'presta/extract'

import { source } from '@/litebook/source'
import { theme } from '@/litebook/theme'
import { styles } from '@/litebook/styles'
import { App } from '@/litebook/App'

const { paths, sources } = source('**/*.md', {
  file: __filename,
  baseDir: path.resolve(__dirname, '../pages')
})
const correctedPaths = paths.map(p => (p === '/index' ? '/' : p))

export function getStaticPaths () {
  return correctedPaths
}

export function handler (props) {
  const { content, frontmatter = {} } = sources[
    props.path === '/' ? '/index' : props.path
  ]
  const hypo = hypostyle(theme)
  const globalStyles = (hypo.injectGlobal(styles), hypo.flush())
  const pages = Object.keys(sources)
    .sort((a, b) => {
      const _a = sources[a].frontmatter.order
      const _b = sources[b].frontmatter.order
      return _a - _b
    })
    .filter(url => url !== '/index')
    .map(url => {
      return {
        url: url === '/index' ? '/' : url,
        ...sources[url].frontmatter
      }
    })
    .reduce((links, link) => {
      const [category, page] = link.url.replace(/^\//, '').split('/')

      if (page) {
        // find existing link
        const existingCat = links.find(p => {
          return p.sidebar_title === category
        })
        // or set default
        const cat = existingCat || {
          sidebar_title: category,
          children: []
        }

        // push child link
        cat.children.push({
          url: link.url,
          sidebar_title: link.sidebar_title
        })

        // update root pages if not exists
        if (!existingCat) links.push(cat)
      } else {
        links.push(link)
      }

      return links
    }, [])

  const markup = renderToStaticMarkup(
    <Hypo hypostyle={hypo}>
      <App pages={pages} content={content} />
    </Hypo>
  )

  return {
    html: html({
      head: {
        title: frontmatter.meta_title || 'Litebook',
        link: [
          `<link href="https://unpkg.com/nord-highlightjs@0.1.0/dist/nord.css" rel="stylesheet" type="text/css" />`,
          { rel: 'stylesheet', href: extract.css(globalStyles, 'styles') },
          `<link rel="preconnect" href="https://fonts.gstatic.com">`,
          `<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">`
        ],
        style: [{ id: 'style', children: hypo.flush() }]
      },
      body: markup,
      foot: {
        script: [
          { src: '/index.js' }
        ]
      }
    })
  }
}

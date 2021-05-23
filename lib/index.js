const { h } = require('hyposcript')
const { hypostyle } = require('hypostyle')
const { configure } = require('hypobox')
const { html } = require('presta/html')
const extract = require('presta/extract')

const { source } = require('./source')
const { theme: defaultTheme } = require('./theme')
const { styles: defaultStyles } = require('./styles')
const { App: DefaultApp } = require('./App')

function litebook (
  baseDir,
  globs,
  { theme = defaultTheme, styles = defaultStyles, App = DefaultApp, logo } = {}
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
              sidebar_title: link.sidebar_title || link.url
            })

            // update root pages if not exists
            if (!existingCategory) links.push(category)

            return links
          }, [])

        const hypo = hypostyle(theme)
        const globalStyles = (hypo.injectGlobal(styles), hypo.flush())

        configure(hypo)

        const markup = h(App, { pages, content, logo })

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
              script: [
                {
                  children: `;(function () {
  var menuToggle = document.getElementById('menuToggle')
  var menu = document.getElementById('menu')

  var open = false

  menuToggle.addEventListener('click', function () {
    if (open) {
      menu.style.display = 'none'
      open = false
    } else {
      menu.style.display = 'block'
      open = true
    }
  })
})()`
                }
              ]
            }
          })
        }
      }
    }
  }
}

module.exports = {
  theme: defaultTheme,
  styles: defaultStyles,
  litebook
}

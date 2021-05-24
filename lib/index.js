const fs = require('fs')
const path = require('path')
const { h } = require('hyposcript')
const { hypostyle } = require('hypostyle')
const { configure } = require('hypobox')
const { html } = require('presta/html')
const extract = require('presta/extract')
const merge = require('deepmerge')
const slugify = require('slugify')

const { source } = require('./source')
const { theme: defaultTheme } = require('./theme')
const { styles: defaultStyles } = require('./styles')
const { App } = require('./App')

function litebook (
  baseDir,
  globs,
  {
    theme = defaultTheme,
    styles = defaultStyles,
    logo,
    version,
    document = {}
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
              sources[a].frontmatter.sidebar_order -
              sources[b].frontmatter.sidebar_order
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
              ...link,
              sidebar_title: link.sidebar_title || link.url
            })

            // update root pages if not exists
            if (!existingCategory) links.push(category)

            return links
          }, [])

        const hypo = hypostyle(theme)
        const globalStyles = (hypo.injectGlobal(styles), hypo.flush())

        configure(hypo)

        const markup = h(App, { pages, content, logo, version })

        return {
          html: html({
            head: merge(
              {
                title: frontmatter.meta_title || 'Litebook',
                link: [
                  {
                    rel: 'stylesheet',
                    href: extract.css(globalStyles, 'styles')
                  },
                  {
                    rel: 'stylesheet',
                    href: extract.css(
                      hypo.flush(),
                      slugify(props.path) || 'index'
                    )
                  }
                ]
              },
              document.head || {}
            ),
            body: markup,
            foot: merge(
              {
                script: [
                  {
                    children: fs.readFileSync(
                      path.resolve(__dirname, './client.js'),
                      'utf8'
                    )
                  }
                ]
              },
              document.foot || {}
            )
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

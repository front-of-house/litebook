const fs = require('fs')
const path = require('path')
const {
  source: root,
  createUrlFromFilepath
} = require('presta/source-filesystem')

const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkHighlight = require('remark-highlight.js')
const remarkFrontmatter = require('remark-frontmatter')
const remarkParseFrontmatter = require('remark-parse-frontmatter')
const remarkLinkHeaders = require('remark-autolink-headings')
const remarkSlug = require('remark-slug')
const remarkGfm = require('remark-gfm')

const remarkToRehype = require('remark-rehype')
const rehypeRaw = require('rehype-raw')
const rehypeToHtml = require('rehype-stringify')

function source (baseDir, globs, file, urlBase) {
  return root(baseDir, globs, {
    extensions: {
      md (filepath, baseDir) {
        const p = createUrlFromFilepath({ filepath, baseDir })
        const index = p === '/index'
        const url = path.join(urlBase, index ? '/' : p)

        const { data, contents } = unified()
          .use(remarkParse)
          .use(remarkFrontmatter)
          .use(remarkParseFrontmatter)
          .use(remarkGfm)
          .use(remarkSlug)
          .use(remarkLinkHeaders, {
            content: {
              type: 'element',
              tagName: 'span',
              properties: {}
            }
          })
          .use(remarkHighlight)
          .use(remarkToRehype)
          .use(rehypeRaw)
          .use(rehypeToHtml)
          .processSync(fs.readFileSync(filepath, 'utf8'))

        return {
          [url]: {
            index,
            content: contents || '',
            frontmatter: data.frontmatter || {}
          }
        }
      }
    }
  })(file)
}

module.exports = { source }

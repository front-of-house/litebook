import fs from 'fs'
import { source as root, createUrlFromFilepath } from 'presta/source-filesystem'
import unified from 'unified'
import parse from 'remark-parse'
import remarkHtml from 'remark-html'
import highlight from 'remark-highlight.js'
import frontmatter from 'remark-frontmatter'
import parseFrontmatter from 'remark-parse-frontmatter'
import autolinkHeadings from 'remark-autolink-headings'
import slug from 'remark-slug'
import gfm from 'remark-gfm'

export function source (globs, options) {
  return root(globs, {
    ...options,
    extensions: {
      md (filepath) {
        const p = createUrlFromFilepath({ filepath, baseDir: options.baseDir })

        const { data, contents } = unified()
          .use(frontmatter)
          .use(parseFrontmatter)
          .use(parse)
          .use(gfm)
          .use(slug)
          .use(autolinkHeadings, {
            content: {
              type: 'element',
              tagName: 'span',
              properties: {}
            }
          })
          .use(remarkHtml)
          .use(highlight)
          .processSync(fs.readFileSync(filepath, 'utf8'))

        return {
          [p]: {
            content: contents || '',
            frontmatter: data.frontmatter || {}
          }
        }
      }
    }
  })
}

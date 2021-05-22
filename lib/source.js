import fs from 'fs'
import { source as root, createUrlFromFilepath } from 'presta/source-filesystem'

import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkHighlight from 'remark-highlight.js'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseFrontmatter from 'remark-parse-frontmatter'
import remarkLinkHeaders from 'remark-autolink-headings'
import remarkSlug from 'remark-slug'
import remarkGfm from 'remark-gfm'

import remarkToRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeToHtml from 'rehype-stringify'

export function source (baseDir, globs, file) {
  return root(baseDir, globs, {
    extensions: {
      md (filepath, baseDir) {
        const p = createUrlFromFilepath({ filepath, baseDir })

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
          [p]: {
            content: contents || '',
            frontmatter: data.frontmatter || {}
          }
        }
      }
    }
  })(file)
}

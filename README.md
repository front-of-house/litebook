# Litebook

A minimalist docs theme built with [presta](https://presta.run/).
Write markdown to generate pages, and use frontmatter to build the sidebar nav.

To give you a sense of how simple this is, here is the source for the [Litebook docs
site](https://litebook.netlify.app):

```javascript
import { litebook } from 'litebook'

const docs = litebook('./pages', '**/*.md')(__filename)

export const getStaticPaths = docs.getStaticPaths
export const handler = docs.handler
```

### License

MIT License © [Sure Thing](https://github.com/sure-thing)

---
meta_title: Setup - Litebook
sidebar_title: Setup
sidebar_order: 1
---

# Setup

Next, we need to configure Litebook and provide Presta an entrypoint to render our pages.

### Entrypoint

Create an file called `site.js`. Presta will use this file to build all your pages.

Then, set up a `litebook` instance like `litebook(docsBase, fileGlobs[, options])(__filename)`:

- `docsBase` is the root directory that contains your markdown files — URLs will
  be resolved relative to this directory
- `fileGlobs` is a `string` or `string[]` that points to markdown files — if you
  want to support nested pages, include a directory glob as well i.e.
  `**/*.md`

```javascript
import { litebook } from 'litebook'

const docs = litebook('./pages', '**/*.md')(__filename)
```

> The `__filename` is important. It tells `litebook` and `presta` which file is
> declaring the docs theme.

### Exports

Presta requires two exports, which `litebook` provides you. Export those
and you're good to go!

```javascript
import { litebook } from 'litebook'

const docs = litebook('./pages', '**/*.md')(__filename)

export const getStaticPaths = docs.getStaticPaths
export const handler = docs.handler
```

Then, just run `npx presta watch site.js` in your terminal and you're ready to
start adding [pages](/getting-started/pages).

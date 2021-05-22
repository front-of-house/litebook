---
meta_title: Setup - Litebook
sidebar_title: Setup
order: 1
---

# Setup

Create an entrypoint, let's call it `site.js`. Presta will use this file to build all your pages.

Then, set up a `litebook` instance like `litebook(docsBase, fileGlobs[, options])(__filename)`:

```javascript
import { litebook } from 'litebook'

const docs = litebook('./pages', '**/*.md')(__filename)
```

> The `__filename` is important. It tells `litebook` and `presta` which file is
> declaring the docs theme.

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

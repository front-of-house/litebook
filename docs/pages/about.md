---
meta_title: About - Litebook
sidebar_title: About
sidebar_order: 0
sidebar_pill: New!
---

# Litebook? Presta?

Litebook is a documentation _theme_. [Presta](https://presta.run/) is a
framework for building websites, like [Next](https://nextjs.org/) or
[Gatsby](https://www.gatsbyjs.com/).

### Presta in Brief

Presta is a serverless-first web framework. It leverages the ergonomics of a
lambda to build and serve web pages and API endpoints. It also has full support
for static generation of pages with almost no config.

### How Litebook Works

Litebook uses `presta/source-filesystem` to source markdown files, parses the
files to HTML and converts their filepath to a URL.

It then returns two Presta methods that are used to render the page:

```javascript
import { litebook } from 'litebook'

const docs = litebook('./pages', '**/*.md')(__filename)

export const getStaticPaths = docs.getStaticPaths
export const handler = docs.handler
```

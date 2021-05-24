---
meta_title: Litebook - Minimalist Docs Boilerplate
---

# Litebook

Litebook is a minimalist documentation theme built with [Presta](https://presta.run/).
Write markdown to generate pages, and use YAML frontmatter to build the sidebar
nav and customize the experience.

### Features

🔥 **fast** - Presta provides an excellent dev experience\
🛋 **simple** - few dependencies, minimal config\
🤓 **familiar** - full Github-flavored markdown support

---

To give you a sense of how simple Litebook is, here is the source for this docs
site:

```javascript
import { litebook } from 'litebook'

const docs = litebook('./pages', '**/*.md')(__filename)

export const getStaticPaths = docs.getStaticPaths
export const handler = docs.handler
```

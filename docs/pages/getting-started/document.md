---
meta_title: Document Customization - Litebook
sidebar_title: Document Customization
sidebar_order: 5
---

# Document Customization

When initially configuring Litebook, you can pass in a few other options to
enhance your site.

### Logo

Pass in a string or [hyposcript](https://github.com/sure-thing/hyposcript)
component to customize the logo that appears in the top-left of the page.

```javascript
const docs = litebook('./pages', '**/*.md', {
  logo: `<svg ... />`
})(__filename)
```

### Version

You can also optionally display the version of your library using the `version`
property.

```javascript
const docs = litebook('./pages', '**/*.md', {
  version: `v1.0.0`
})(__filename)
```

> We're considering options to allow for async resolution of version strings,
> such that you could make a network request during build.

### `head` and `foot`

Presta provides an API to insert `meta` and other tags into the `<head>` element
and before the closing `</body>` (the _foot_). Litebook provides easy access to
this API.

```javascript
const docs = litebook('./pages', '**/*.md', {
  head: {
    image: '/open-graph-image.jpg',
    meta: [{ name: 'description', content: 'Description for SEO' }],
    link: [`<link rel="icon" type="image/png" href='/favicon.png' />`],
    style: [{ children: `.class { color: blue }` }]
  },
  foot: {
    script: [{ src: '/client.js' }]
  }
})(__filename)
```

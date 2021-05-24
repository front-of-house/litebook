---
meta_title: Pages - Litebook
sidebar_title: Pages
sidebar_order: 3
---

# Pages

In the previous section, we set up a `litebook` instance and specified
`./pages` as our root pages directory. Create that now, and add an `index.md`
file i.e. `./pages/index.md`.

```markdown
# Hello world!
```

Your site should reload and you should see your `index.md` page as the homepage
of your docs site!

> If you haven't run `npx presta watch site.js` yet, do so now to build and
> preview your site ;)

## Other Pages

Markdown files other than `index.md` will be transformed into pages at URLs
based on their directory structure.

For example, `about.md` will become `/about`, and
`/getting-started/install.md` will become `/getting-started/install`.

## Nested Pages

Any markdown files defined within a directory, such as `/getting-started` will
appear in the sidebar beneat a category label based on the directory name
itself.

For example, `/getting-started/install` will result in a category of `Getting Started` and `/getting-started/install` will appear below it.

To customize the sidebar title, use metadata.

## Metadata

Pages support basic metadata via `yaml` _frontmatter_. Use the following props
to configure your pages.

- `meta_title` - the title that appears in your browser tab
- `sidebar_title` - the title that appears in the sidebar nav
- `order` - `int` - the order the page should appear in the sidebar

For example:

```yaml
---
meta_title: Pages - Litebook
sidebar_title: Pages
order: 3
---
# Pages
```

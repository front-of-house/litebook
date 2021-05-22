---
meta_title: Styleguide - Litebook
sidebar_title: Styleguide
order: 10
---

# Styleguide

Litebook supports "Github Flavored Markdown", and highlights code blocks using
`highlight.js` and the Nord theme. Base styles are in, but a full styleguide is
coming soon.

> You can create blockquotes like this for now. Admonition-style alerts coming
> soon!

- lists
- look
- like
  - this
  - and
  - you
    1. can
    2. nest
    3. them

### Code Blocks

```javascript
function foo () {
  return 'bar'
}
```

| PROPERTY               | TYPE                 | REQUIRED | DESCRIPTION                                                                                                                              |
| ---------------------- | -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| type                   | `Type`               | X        | Type of verification request.                                                                                                            |
| permissible_purpose    | `PermissiblePurpose` | X        | Reason for why this verification is being conducted                                                                                      |
| target                 | `Target`             | X        | Information on the individual who is being verified                                                                                      |
| documents              | `Document[]`         |          | Supporting documentation for the verification                                                                                            |
| additional_information | string               |          | Any additional information about the target that can help expedite the completion of the verification request - max: 1k chars.           |
| loan_id                | string               |          | The loan id associated with the verification request                                                                                     |
| metadata               | JSON                 |          | A single level key-value JSON object that can be used to store custom data on the verification request. Keys and values must be strings. |

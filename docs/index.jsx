import { litebook } from 'litebook'

const docs = litebook('./pages', '**/*.md', {
  version: 'v1.2.2',
  document: {
    head: {
      image: '/og.png',
      link: [
        `<link rel="icon" type="image/png" href='/favicon.png' />`,
        `<link href="https://unpkg.com/nord-highlightjs@0.1.0/dist/nord.css" rel="stylesheet" type="text/css" />`,
        `<link rel="preconnect" href="https://fonts.gstatic.com">`,
        `<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">`
      ]
    }
  }
})(__filename)

export const getStaticPaths = docs.getStaticPaths
export const handler = docs.handler

import { litebook } from '@/litebook'

const docs = litebook('../pages', '**/*.md')(__filename)

export const getStaticPaths = docs.getStaticPaths
export const handler = docs.handler

const { h } = require('hyposcript')
const { Box } = require('hypobox')

function Menu (props) {
  return h(
    Box,
    {
      as: 'svg',
      xmlns: 'http://www.w3.org/2000/svg',
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      ...props
    },
    [
      h('line', {
        x1: '3',
        y1: '12',
        x2: '21',
        y2: '12'
      }),
      h('line', {
        x1: '3',
        y1: '6',
        x2: '21',
        y2: '6'
      }),
      h('line', {
        x1: '3',
        y1: '18',
        x2: '21',
        y2: '18'
      })
    ]
  )
}

module.exports = { Menu }

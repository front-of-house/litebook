import React from 'react'
import { Box } from '@hypobox/react'

export function Menu (props) {
  return (
    <Box
      as='svg'
      dib
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <line x1='3' y1='12' x2='21' y2='12'></line>
      <line x1='3' y1='6' x2='21' y2='6'></line>
      <line x1='3' y1='18' x2='21' y2='18'></line>
    </Box>
  )
}

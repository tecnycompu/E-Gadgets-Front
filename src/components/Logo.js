import React from 'react'

const Logo = ({w,h}) => {
  return (
<svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <text x="10" y="30" font-family="Arial" font-size="34" fill="#000000" filter="url(#shadow)">
    E-Gadgets
  </text>
</svg>

  )
}

export default Logo
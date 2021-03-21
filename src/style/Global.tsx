import { createGlobalStyle, keyframes } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { MarioTheme } from '@marioswap-libs/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends MarioTheme {}
}

const slide = keyframes`
   from { background-position: 0 0; }
    to { background-position: -1000px 0; }
`

const GlobalStyle = createGlobalStyle`

@font-face {font-family: "Yoster Island"; src: url("/fonts/yoster.ttf");
  * {
  font-family: "Yoster Island";
 }

  
  body {
    background: ${({ theme }) => theme.colors.background};
    img {
      height: auto;
      max-width: 100%;
    }
  }
`
//  background: ${({ theme }) => theme.colors.background} url('/images/smb35-tile-5.png') repeat 0 0;
//     animation: ${slide} 20s linear infinite;
export default GlobalStyle
// background-color: ${({ theme }) => theme.colors.background};
//     background-image: url('/images/smb35-tile-5.png');
  // background-repeat: repeat;
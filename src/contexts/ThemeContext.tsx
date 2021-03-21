import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from '@marioswap-libs/uikit'

console.log(JSON.stringify(light));
console.log(JSON.stringify(dark));
const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })
// "primary": "#e70012",
const marioLight = {
  "siteWidth": 1200,
  "breakpoints": [
    "370px",
    "576px",
    "852px",
    "968px",
    "1080px"
  ],
  "mediaQueries": {
    "xs": "@media screen and (min-width: 370px)",
    "sm": "@media screen and (min-width: 576px)",
    "md": "@media screen and (min-width: 852px)",
    "lg": "@media screen and (min-width: 968px)",
    "xl": "@media screen and (min-width: 1080px)",
    "nav": "@media screen and (min-width: 968px)"
  },
  "spacing": [
    0,
    4,
    8,
    16,
    24,
    32,
    48,
    64
  ],
  "shadows": {
    "level1": "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
    "active": "0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)",
    "success": "0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)",
    "warning": "0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)",
    "focus": "0px 0px 0px 1px #499DF5, 0px 0px 0px 4px rgba(118, 69, 217, 0.6)",
    "inset": "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
  },
  "radii": {
    "small": "4px",
    "default": "16px",
    "card": "32px",
    "circle": "50%"
  },
  "zIndices": {
    "dropdown": 10,
    "modal": 100
  },
  "isDark": false,
  "alert": {
    "background": "#FFFFFF"
  },
  "colors": {
    "failure": "#ED4B9E",
    "primary": "#8873f4",
    "primaryBright": "#53DEE9",
    "primaryDark": "#0098A1",
    "secondary": "#e06221",
    "success": "#31D0AA",
    "warning": "#FFB237",
    "binance": "#F0B90B",
    "background": "#FAF9FA",
    "backgroundDisabled": "#E9EAEB",
    "contrast": "#191326",
    "invertedContrast": "#FFFFFF",
    "input": "#eeeaf4",
    "inputSecondary": "#d7caec",
    "tertiary": "#EFF4F5",
    "text": "#32558c",
    "textDisabled": "#BDC2C4",
    "textSubtle": "#484848",
    "borderColor": "#E9EAEB",
    "card": "#FFFFFF",
    "gradients": {
      "bubblegum": "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)"
    }
  },
  "card": {
    "background": "#FFFFFF",
    "boxShadow": "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
    "boxShadowActive": "0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)",
    "boxShadowSuccess": "0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)",
    "boxShadowWarning": "0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)",
    "cardHeaderBackground": "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    "dropShadow": "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))"
  },
  "toggle": {
    "handleBackground": "#FFFFFF"
  },
  "nav": {
    "menuBackground": "#d23c41",
    "background": "#ffffff",
    "hover": "#EEEAF4"
  },
  "modal": {
    "background": "#FFFFFF"
  },
  "radio": {
    "handleBackground": "#FFFFFF"
  },
  "tooltip": {
    "background": "#27262c",
    "text": "#EAE2FC",
    "boxShadow": "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)"
  }
};

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : marioLight}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }

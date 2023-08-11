import addDecorator from '@storybook/react'
import { theme } from '../src/themes'
import { ThemeProvider, createGlobalStyle } from "styled-components";
import * as NextImage from 'next/image'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: --apple-system, BlinkMacSystemFont, Seogoe UI,Roboto,
    Oxygen, Ubuntu, Cantarell, FiraSans, DroidSans, HelveticaNeue, sansserif;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    transition: .25s;
    color: #000000;
  }
`


const originalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => typeof props.src === 'string' ? (
    <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
  ) : (
    <OriginalNextImage {...props} unoptimized />
  ),
})

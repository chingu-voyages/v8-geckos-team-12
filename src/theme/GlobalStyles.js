import { createGlobalStyle } from 'styled-components'

export const globalStylesTagged = `
a, a:visited {
  color: rgb(250,250,255);
}
//Custom Scroll Bar
// body::-webkit-scrollbar {
//   z-index: 1;
// width: .75vw;
// border-radius: 10000px;
// background:  rgba(0,0,0,.4);
// }

// body::-webkit-scrollbar:hover{
//   border: 1px solid rgba(0,0,0,.05);
//   z-index: 1;
//   background: rgba(0,0,0,.1);
// width: .75vw;
//   }


// /* Track */
// body::-webkit-scrollbar-track {
//   z-index: 1;
//   background: transparent;
// }

// /* Handle */
// body::-webkit-scrollbar-thumb {
//   border-radius: 1000px;
//   z-index: 1;
//   border: 1px solid #666; 
//   background: rgba(0,0,0,.1);
// }


// /* Handle on hover */
// body::-webkit-scrollbar-thumb:hover {
//   border: 1px solid #444;
//   box-shadow: 0 0 5px #;
//   z-index: 1;
//   background: rgba(0,0,0,.2); 
// }

html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: baseline;
    text-decoration: none;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`
export const GlobalStyle = createGlobalStyle`${globalStylesTagged}`

export default GlobalStyle

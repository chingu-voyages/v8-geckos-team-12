import { createGlobalStyle } from 'styled-components'

const darken = color =>
  color
    .split(',')
    .map(num => Number(num / 2).toFixed(0))
    .join(',')

export const GlobalStyle = createGlobalStyle`

${({
  theme: {
    colors: {
      RGBMainDark,
      RGBMainLight,
      RGBAccentDark,
      RGBAccentLight,
      RGBBrandColor,
    },
    darkMode,
  },
}) => `
  :root {
  --main-dark: rgb( ${darkMode ? darken(RGBMainLight) : RGBMainDark});
  --main-light: rgb(${darkMode ? RGBMainDark : RGBMainLight});
  --accent-dark: rgb(${darkMode ? darken(RGBAccentLight) : RGBAccentDark});
  --accent-light: rgb(${darkMode ? RGBAccentDark : RGBAccentLight});
  --brand-color: rgb(${darkMode ? darken(RGBBrandColor) : RGBBrandColor});
  --rgb-main-dark: ${darkMode ? darken(RGBMainLight) : RGBMainDark};
  --rgb-main-light: ${darkMode ? RGBMainDark : RGBMainLight};
  --rgb-accent-dark: ${darkMode ? darken(RGBAccentLight) : RGBAccentDark};
  --rgb-accent-light: ${darkMode ? RGBAccentDark : RGBAccentLight};
  --rgb-brand-color: ${RGBBrandColor};
}
  `}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--main-light);
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color: var(--main-light);
}

::-ms-input-placeholder { /* Microsoft Edge */
    color: var(--main-light);
}

.ap-dropdown-menu {
  background: var(--main-light);
  color: var(--main-dark);
}

a, a:visited {
  color: rgb(250,250,255);
}

body::-webkit-scrollbar, ::-webkit-scrollbar {
  z-index: 1;
width: .75vw;
border-radius: 10000px;
background:  rgba(var(--rgb-main-dark),0.5);
}

body::-webkit-scrollbar:hover, ::-webkit-scrollbar:hover {
  border: 1px solid  rgba(var(--rgb-main-dark),0.5);
  z-index: 1;
  background:  rgba(var(--rgb-main-dark),0.2);
width: .75vw;
  }


/* Track */
body::-webkit-scrollbar-track, ::-webkit-scrollbar-track {
  z-index: 1;
  background: transparent;
}

/* Handle */
body::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb {
  border-radius: 1000px;
  z-index: 1;
  border: 1px solid var(--main-dark);
  background: rgba(var(--rgb-brand-color), 0.2);
}


/* Handle on hover */
body::-webkit-scrollbar-thumb:hover, ::-webkit-scrollbar-thumb:hover {
  border: 1px solid var(--main-dark);
  box-shadow: 0 0 5px var(--main-dark);
  z-index: 1;
  background:rgba(var(--rgb-brand-color), 0.2);
}

html,
  body,
  div,
  span,
  input,
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
    font-family: Raleway, Arial, Helvetica, sans-serif;
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

  body {
    overflow-x: hidden;
    background: var(--brand-color);
  background: -webkit-linear-gradient(
    to top left,
    var(--accent-dark),
    var(--brand-color),
    var(--main-dark)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top left,
    var(--accent-dark),
    var(--brand-color),
    var(--main-dark)
  );
    color: rgba(125,125,125,.9);
  }
`

export default GlobalStyle

export const RGBMainDark = `57, 61, 63`
export const RGBMainLight = `207, 215, 199`
export const RGBAccentDark = `114, 110, 117`
export const RGBAccentLight = `213, 187, 177`
export const RGBBrandColor = `172, 159, 187`

export const mainDark = `rgb(${RGBMainDark})`
export const mainLight = `rgb(${RGBMainLight})`
export const accentDark = `rgb(${RGBAccentDark})`
export const accentLight = `rgb(${RGBAccentLight})`
export const brandColor = `rgb(${RGBBrandColor})`

export const defaultStyle = {
  name: 'default',
  colors: {
    RGBMainDark: `57, 61, 63`,
    RGBMainLight: `207, 215, 199`,
    RGBAccentDark: `114, 110, 117`,
    RGBAccentLight: `213, 187, 177`,
    RGBBrandColor: `172, 159, 187`,
  },
}

const bright = {
  name: 'bright',
  colors: {
    RGBMainDark: `38,34,74`,
    RGBMainLight: `251,254,249`,
    RGBAccentDark: `236,177,67`,
    RGBAccentLight: `149,201,209`,
    RGBBrandColor: `238,72,104`,
  },
}

const muted = {
  name: 'muted',
  colors: {
    RGBMainDark: `20,17,20`,
    RGBMainLight: `231,230,224`,
    RGBAccentDark: `92,106,128`,
    RGBAccentLight: `13,119,131`,
    RGBBrandColor: `9,120,122`,
  },
}

const earth = {
  name: 'earth',
  colors: {
    RGBMainDark: `69,86,37`,
    RGBMainLight: `244,242,245`,
    RGBAccentDark: `147,126,83`,
    RGBAccentLight: `150,162,95`,
    RGBBrandColor: `170,146,79`,
  },
}

export const themes = [defaultStyle, bright, muted, earth]

export default {
  mainDark,
  mainLight,
  accentDark,
  accentLight,
  brandColor,
  RGBMainDark,
  RGBMainLight,
  RGBAccentDark,
  RGBAccentLight,
  RGBBrandColor,
}

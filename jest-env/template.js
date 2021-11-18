const BASE_URL = 'http://localhost:3000'

const HEAD = `
<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Every Color</title>

<base href="${BASE_URL}">

<link rel="stylesheet" href="jest-env/layout.css">

<link rel="stylesheet" href="palette.css">
<link rel="stylesheet" href="theme.css">
<link rel="stylesheet" href="color.css">
`

const injectPage = (content = '', {
  title = `🧪 ${expect.getState().currentTestName}`,
  page = global.page,
} = {}) =>
  page.setContent([
    HEAD,
    title ? `<h1>${title}</h1>` : '',
    content,
  ].join('\n'))

export default injectPage

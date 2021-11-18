import { camelCase, paramCase } from 'change-case'
import { printExpected, printReceived, matcherHint } from 'jest-matcher-utils'
import extractStyle from './style'
import inject from './template'

const messageStyle = (received, expected, mismatching) => () => `${matcherHint(
  '.toMatchStyle',
  'received',
  'expected',
)}

Expected subset of style matching values:
${mismatching
  .map(name => [
    `  ${paramCase(name)}:`,
    `    ${printReceived(received[name])}`,
    `    ${printExpected(expected[name])}`,
  ].join('\n')).join('\n')
}`

const matchStyle = (received, expected) => {
  const mismatchingProperties = Object.entries(expected)
    .filter(([name, value]) => !Object.is(received[name], value))
    .map(([name]) => paramCase(name))

  return {
    pass: mismatchingProperties.length === 0,
    message: messageStyle(received, expected, mismatchingProperties),
  }
}

const subsetStyle = (style, properties) => {
  if (!properties || properties.length === 0) return style

  const normalizedProperties = Array.from(properties, camelCase)
  const propertySet = new Set(normalizedProperties)

  return Object.fromEntries(Object.entries(style)
    .filter(([name]) => propertySet.has(name)))
}


const toMatchStyleOf = async (received, targetSelector, propertySet) => {
  const expected = await extractStyle(targetSelector)
  return matchStyle(await received, subsetStyle(expected, propertySet))
}

let testPage
const toMatchStyle = async (received, expected) => {
  const serialized = Object.entries(expected)
    .map(([name, value]) => [paramCase(name), value].join(': '))
    .join('; ')

  if (testPage == null) testPage = await browser.newPage()
  await inject(`<div style="${serialized}"></div>`, {
    page: testPage,
  })

  const evaluated = await extractStyle('div', testPage)
  const propertySet = Object.keys(expected)
  return matchStyle(await received, subsetStyle(evaluated, propertySet))
}

export { toMatchStyle, toMatchStyleOf }

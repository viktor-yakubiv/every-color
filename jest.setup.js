import {
  classNames,
  definitions,
  matchers,
  injectPage,
  styleOf,
  takeScreenshot,
} from './jest-env'

const screenshotIfDebug = (...args) => {
  // Taking screenshots only in the debug mode to seed up testing in general
  //
  // On MacOS, taking the screenshot gets at least 1/6s what could be quite
  // long if the number of tests increases
  //
  // See more:
  // https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-pagescreenshotoptions
  if (!process.env.DEBUG || process.env.DEBUG === 'false') {
    return
  }

  return takeScreenshot(...args)
}

Object.assign(global, {
  ...definitions,
  classNames,
  injectPage,
  styleOf,
  takeScreenshot: screenshotIfDebug,
})

expect.extend(matchers)

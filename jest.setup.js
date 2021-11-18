import {
  classNames,
  definitions,
  matchers,
  injectPage,
  styleOf,
  takeScreenshot,
} from './jest-env'

Object.assign(global, {
  ...definitions,
  classNames,
  injectPage,
  styleOf,
  takeScreenshot,
})

expect.extend(matchers)

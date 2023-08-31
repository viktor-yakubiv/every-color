import { dirname } from 'node:path'

const projectRoot = dirname(new URL(import.meta.url).pathname)

export default {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: [`${projectRoot}/spec/**/*.js`],
}

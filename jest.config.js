module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: [`${__dirname}/spec/**/*.js`],
}

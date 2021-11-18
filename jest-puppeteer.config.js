module.exports = {
  server: {
    command: 'http-server --port 3000',
    port: 3000,
  },

  launch: {
    headless: process.env.HEADLESS !== 'false',
  },
}

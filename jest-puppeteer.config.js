module.exports = {
  server: {
    command: 'http-server --port 3000',
    port: 3000,
  },

  launch: {
    headless:
      ['false', 'no', '0'].includes(String(process.env.HEADLESS).toLowerCase())
        ? false
        : 'new',
  },
}

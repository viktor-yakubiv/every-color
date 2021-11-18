const takeScreenshot = async (name = expect.getState().currentTestName) =>
  page.screenshot({
    path: `${__dirname}/screenshots/${name}.png`,
    fullPage: true,
  })

export default takeScreenshot

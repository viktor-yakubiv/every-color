import { promises as fs } from 'fs'
import path from 'path'

const screenshotRoot = `${path.join(__dirname, '../')}/screenshots`

const takeScreenshot = async (name = expect.getState().currentTestName) => {
  await fs.mkdir(screenshotRoot, { recursive: true })
  await page.screenshot({
    path: `${screenshotRoot}/${name}.png`,
    fullPage: true,
  })
}

export default takeScreenshot

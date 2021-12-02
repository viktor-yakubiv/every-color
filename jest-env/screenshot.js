import { promises as fs } from 'fs'
import path from 'path'

const takeScreenshot = async (name = expect.getState().currentTestName, {
  dir = `${path.join(__dirname, '..')}/screenshots`
} = {}) => {
  await fs.mkdir(dir, { recursive: true })
  await page.screenshot({
    path: `${dir}/${name}.png`,
    fullPage: true,
  })
}

export default takeScreenshot

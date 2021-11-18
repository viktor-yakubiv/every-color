const extractStyle = (selector, page = global.page) =>
  page.evaluate((selector) => {
    const targetElement = document.querySelector(selector)
    const computedStyle = getComputedStyle(targetElement)

    const color = computedStyle.getPropertyValue('color')
    const backgroundColor = computedStyle.getPropertyValue('background-color')
    const borderLeftColor = computedStyle.getPropertyValue('border-left-color')

    return { color, backgroundColor, borderLeftColor }
  }, selector)

export default extractStyle

const element = ({ tag = 'div', ...props } = {}, children = []) => {
  const e = document.createElement(tag)

  Object.assign(e, props)

  e.append(...children.map(child =>
    typeof child == 'string' ? document.createTextNode(child) : child))

  return e
}

const mount = (e, target) => {
  const container = typeof target == 'string'
    ? document.querySelector(target)
    : target

  return container.append(e)
}

export { element, mount }

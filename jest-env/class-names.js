const filter = (...args) => args.filter(defined => defined)

const join = (...parts) => filter(...parts.flat(10)).join(' ')

const combine = (...parts) => {
  if (parts.length === 1) {
    return join(...parts)
  }

  if (parts.length === 2) {
    const [base, appendix] = parts
    return join(base, 'with', appendix)
  }

  const [base, appendix, ...rest] = parts
  return join(base, 'with', appendix, 'and', ...parts)
}

const surface = (accent, contrast) => join(accent, contrast, 'surface')
const content = (emphasis, accent) => join(accent, emphasis, 'content')

export { join, combine, surface, content }

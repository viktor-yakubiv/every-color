const join = (...parts) => parts.flat(10).join(' ')

const combine = (base, appendix) =>
  join(base, appendix ? ['with', appendix] : [])

export { join, combine }

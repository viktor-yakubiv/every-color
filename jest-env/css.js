const constructVar = ({
  scope = 'theme',
  accent,
  emphasis,
  target = emphasis ? 'content' : 'background',
}) =>
  ['-', scope, accent, emphasis, target].filter(x => x).join('-')

const useVar = (...args) => `var(${constructVar(...args)})`

export {
  constructVar,
  useVar,
}

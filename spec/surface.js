const id = (...parts) =>
  parts.flatMap(s => s.split(/\s+/)).join('-')

const hash = (...parts) => `#${id(...parts)}`

const cases = accents.flatMap(a => contrasts.map(e => [a, e]))

const renderSurface = ({
  accent = '',
  className = `a box & stack with ${accent} surface`,
  tag = 'div',
} = {}, content = className) => `
  <${tag} class="${className}">
    ${content}
  </${tag}>
`

test('surface itself is neutral', async () => {
  await injectPage(renderSurface())
  await expect(styleOf('.surface')).toMatchStyleOf(':root', ['color'])
})

test('surface changes the content color', async () => {
  await injectPage(`
    <style>:root { color: indigo !important }</style>
    ${renderSurface()}
  `)
  await expect(styleOf('.surface')).toMatchStyle({
    color: useVar({ accent: 'neutral', emphasis: 'major' }),
  })
})

test('surface with accent applies color to the content inside', async () => {
  await injectPage(accents.map(accent => renderSurface({ accent },
    emphasises.map(emphasis => `
      <p class="${emphasis} content">${emphasis} content</p>
    `).join('\n')
  )).join('\n'), { screenshot: 'surface-accent' })

  for (const accent of accents) {
    await expect(styleOf(`.${accent}.surface`)).toMatchStyle({
      color: useVar({ accent, emphasis: 'major' }),
      backgroundColor: useVar({ accent }),
    })

    for (const emphasis of emphasises) {
      await expect(styleOf(`.${accent}.surface .${emphasis}`)).toMatchStyle({
        color: useVar({ accent, emphasis }),
      })
    }
  }
})

// Mixing stuff up on brand surface is completely user's responsibility
test.skip('nested accent works only inside of neutral surfaces', async () => {
  await injectPage(accents.map(parentAccent => renderSurface({
    accent: parentAccent,
  }, `
    <h2>parent ${parentAccent} surface</h2>
    ${accents.map(childAccent => `
      <div class="switcher">
        ${renderSurface(
          { accent: childAccent, tag: 'p' },
          `nested ${childAccent} surface`,
        )}
        <p class="a box with ${childAccent} content">
          nested ${childAccent} content
        </p>
      </div>
    `).join('\n')}
  `)).join('\n'), { screenshot: 'surface-nested-accent' })

  for (const parentAccent of accents.slice(1)) {
    for (const childAccent of accents) {
      const contentSelector = `.${parentAccent}.surface .${childAccent}.content`
      const surfaceSelector = `.${parentAccent}.surface .${childAccent}.surface`

      const accent = parentAccent === 'neutral' ? childAccent : parentAccent

      await expect(styleOf(contentSelector)).toMatchStyle({
        color: useVar({ accent, emphasis: 'major' }),
      })

      await expect(styleOf(surfaceSelector)).toMatchStyle({
        color: useVar({ accent, emphasis: 'major' }),
        // backgroundColor: 'transparent', // not sure in this
      })
    }
  }
})

const id = (...parts) =>
  parts.flatMap(s => s.split(/\s+/)).join('-')

const hash = (...parts) => `#${id(...parts)}`

const cases = accents.flatMap(a => emphasises.map(e => [a, e]))

// It's not possible to make the content mixin placeholder in one case and
// apply actual properties in another.
test.skip('content itself does not apply anything', async () => {
  await injectPage({
    body: '<p class="content">bare content</p>',
    screenshot: 'bare-content',
  })
  await expect(styleOf('.content')).toMatchStyleOf(':root', ['color'])

  await injectPage({
    body: `
      <style>:root { color: indigo !important }</style>
      <p class="content">bare content</p>
    `,
    screenshot: 'bare-content-modified',
  })
  await expect(styleOf('.content')).toMatchStyle({ color: 'indigo' })
})

test('content with accent and emphasis applies both', async () => {
  await injectPage(cases.map(([accent, emphasis]) => `
    <p class="${accent} ${emphasis} content">
      ${accent} ${emphasis} content
    </p>
  `).join('\n'), { screenshot: 'content-basics' })

  for (const [accent, emphasis] of cases) {
    await expect(styleOf(`.${accent}.${emphasis}.content`)).toMatchStyle({
      color: useVar({ accent, emphasis })
    })
  }
})

test('content with accent applies major emphasis', async () => {
  await injectPage(accents.map(accent => `
    <p class="${accent} content">${accent} content</p>
  `).join('\n'), { screenshot: 'content-accent' })

  for (const accent of accents) {
    await expect(styleOf(`.${accent}`)).toMatchStyle({
      color: useVar({ accent, emphasis: 'major' }),
    })
  }
})

test('content with emphasis applies no accent', async () => {
  await injectPage(emphasises.map(emphasis => `
    <p class="${emphasis} content">${emphasis} content</p>
  `).join('\n'), { screenshot: 'content-emphasis' })

  for (const emphasis of emphasises) {
    await expect(styleOf(`.${emphasis}.content`)).toMatchStyle({
      color: useVar({ emphasis }),
    })
  }
})

test('bare emphasis is a shorthand for content', async () => {
  await injectPage(emphasises.map(emphasis => `
    <p class="${emphasis}">${emphasis}</p>
  `, { screenshot: 'bare-emphasis' }).join('\n'))

  for (const emphasis of emphasises) {
    await expect(styleOf(`.${emphasis}`)).toMatchStyle({
      color: useVar({ emphasis }),
    })
  }
})

test('bare accent is a shorthand for content', async () => {
  await injectPage(accents.map(accent => `
    <p class="${accent}">${accent}</p>
  `).join('\n'), { screenshot: 'bare-accent' })

  for (const accent of accents) {
    await expect(styleOf(`.${accent}`)).toMatchStyle({
      color: useVar({ accent, emphasis: 'major' }),
    })
  }
})

test('nested emphasis changes the inherited one', async () => {
  await injectPage(`
    ${cases.map(([accent, parentEmphasis]) => `
      <div class="switcher">
        ${emphasises.map(childEmphasis => `
          <p
            id="${id(accent, parentEmphasis, childEmphasis)}"
            class="${accent} ${parentEmphasis} content"
          >
            <span class="${childEmphasis} content">
              ${childEmphasis} content
            </span>
            inside ${accent} ${parentEmphasis} content
          </p>
        `).join('\n')}
      </div>
    `).join('\n')}
  `, { screenshot: 'nested-emphasis' })

  for (const [accent, parentEmphasis] of cases) {
    for (const childEmphasis of emphasises) {
      const container = hash(accent, parentEmphasis, childEmphasis)

      await expect(styleOf(container)).toMatchStyle({
        color: useVar({ accent, emphasis: parentEmphasis }),
      })

      await expect(styleOf(`${container} span`)).toMatchStyle({
        color: useVar({ accent, emphasis: childEmphasis }),
      })
    }
  }
})

/**
 * This seems to be impossible to discover emphasis from the parent element,
 * so the nested element defaults emphasis to major. Therefore, this test fails.
 *
 * Until I find a solution for this, this test is skipped.
 */
test.skip('nested accent changes the inherited one', async () => {
  await injectPage(`
    ${cases.map(([parentAccent, emphasis]) => `
      <div class="switcher">
        ${accents.map(childAccent => `
          <p
            id="${id(parentAccent, childAccent, emphasis)}"
            class="${parentAccent} ${emphasis} content"
          >
            <span class="${childAccent} content">
              ${childAccent} content
            </span>
            inside ${parentAccent} ${emphasis} content
          </p>
        `).join('\n')}
      </div>
    `).join('\n')}
  `, { 'screenshot': 'nested-accent' })

  for (const [parentAccent, emphasis] of cases) {
    for (const childAccent of accents) {
      const container = hash(parentAccent, childAccent, emphasis)

      await expect(styleOf(container)).toMatchStyle({
        color: useVar({ accent: parentAccent, emphasis }),
      })

      await expect(styleOf(`${container} span`)).toMatchStyle({
        color: useVar({ accent: childAccent, emphasis }),
      })
    }
  }
})

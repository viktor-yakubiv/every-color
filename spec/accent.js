const injectPrecedencePage = (options = {
  title: `Accent precedence: ${accents.join(', ')}`,
  screenshot: 'accents-precedence',
}) => {
  const groups = [
    ...brandAccents.map(accent => ['neutral', accent]),
    ...brandAccents.map(accent => [accent, 'info']),
    ...semanticAccents.slice(1).map((accent, i) => [semanticAccents.at(i), accent]),
  ]

  return injectPage(`
    <div class="stack">
      ${groups.map(accents => `
        <div class="${accents.join(' ')} content">
          Between ${accents.slice(0, -1).join(', ')} and <b>${accents.at(-1)}</b>
          the later defines the dominant content
        </div>

        <div class="a box with ${accents.join(' ')} surface">
          Between ${accents.slice(0, -1).join(', ')} and <b>${accents.at(-1)}</b>
          the later defines the dominant surface
        </div>
      `).join('\n')}
    </div>
  `, options)
}

const testPrecedence = async (...accents) => {
  const finalAccent = accents.at(-1)

  await expect(styleOf(`.${accents.join('.')}.content`)).toMatchStyle({
    color: useVar({ accent: finalAccent, emphasis: 'major' }),
  })

  await expect(styleOf(`.${accents.join('.')}.surface`)).toMatchStyle({
    color: useVar({ accent: finalAccent, emphasis: 'major' }),
    backgroundColor: useVar({ accent: finalAccent }),
  })
}

const injectNestingPage = (targetAccents, allAccents = accents) =>
  injectPage(targetAccents.map(parent => `
    <div class="stack">
      ${allAccents.map(child => `
        <p class="${parent} content">
          <span class="${child} content">${child} content</span>
          in ${parent} content
        </p>

        <div class="a box and switcher with ${parent} surface">
          <p class="a box with ${child} content">
            ${child} content on ${parent} surface
          </p>

          <div class="a box with ${child} surface">
            ${child} surface on ${parent} surface
          </div>
        </div>
      `).join('\n')}
    </div>
  `).join('\n'))

const testNesting = async (parent, child, style) => {
  const { color, backgroundColor } = style

  const contentInContent = `.${parent}.content .${child}.content`
  await expect(styleOf(contentInContent)).toMatchStyle({ color })

  const contentOnSurface = `.${parent}.surface .${child}.content`
  await expect(styleOf(contentOnSurface)).toMatchStyle({ color })

  const surfaceOnSurface = `.${parent}.surface .${child}.surface`
  await expect(styleOf(surfaceOnSurface)).toMatchStyle({
    color,
    backgroundColor,
  })
}

describe('neutral', () => {
  it('has the lowest precedence', () => {
    // passes if the following one passes
  })
})

describe('brand accent', () => {
  it('takes precedence over neutral', async () => {
    await injectPrecedencePage()
    for (const accent of brandAccents) {
      await testPrecedence('neutral', accent)
    }
  })

  it('can be redefined in any level of nesting', async () => {
    injectNestingPage(brandAccents)

    for (const parent of brandAccents) {
      for (const child of accents) {
        await testNesting(parent, child, {
          color: useVar({ accent: child, emphasis: emphasises.at() }),
          backgroundColor: useVar({ accent: child }),
        })
      }
    }
  })
})

describe('semantic accent', () => {
  it('takes precedence over brand accents', async () => {
    await injectPrecedencePage()
    for (const brandAccent of brandAccents) {
      // comparing against the first item from semantic accents
      // which should have the lowest precedence
      await testPrecedence(brandAccent, semanticAccents.at())
    }
  })

  it(`has the following precedence: ${semanticAccents.join(', ')}`, async () => {
    await injectPrecedencePage()
    for (let i = 0; i < semanticAccents.length - 1; ++i) {
      const lowerAccent = semanticAccents.at(i)
      const upperAccent = semanticAccents.at(i + 1)
      await testPrecedence(lowerAccent, upperAccent)
    }
  })

  it('cannot be redefined in context', async () => {
    await injectNestingPage(semanticAccents)

    for (const parent of semanticAccents) {
      for (const child of accents) {
        await testNesting(parent, child, {
          color: useVar({ accent: parent, emphasis: emphasises.at() }),
          backgroundColor: 'transparent',
        })
      }
    }
  })
})

const testPrecedence = async (...accents) => {
  const finalAccent = accents[accents.length - 1]

  await injectPage(`
    <div class="stack">
      <div class="${accents.join(' ')} content">
        Must be ${finalAccent} content
      </div>

      <div class="a box with ${accents.join(' ')} surface">
        Must have ${finalAccent} surface
      </div>
    </div>
  `, { screenshot: `accents-precedence-${accents.join('-')}` })

  await expect(styleOf(`.${accents.join('.')}.content`)).toMatchStyle({
    color: useVar({ accent: finalAccent, emphasis: 'major' }),
  })

  await expect(styleOf(`.${accents.join('.')}.surface`)).toMatchStyle({
    color: useVar({ accent: finalAccent, emphasis: 'major' }),
    backgroundColor: useVar({ accent: finalAccent }),
  })
}

describe('neutral', () => {
  it.todo('could be part of brand accents list')
})

describe('brand accent', () => {
  it('takes precedence over neutral', async () => {
    for (const accent of brandAccents) {
      await testPrecedence('neutral', accent)
    }
  })

  it.todo('can be redefined in any level of nesting')
})

describe('semantic accent', () => {
  it('takes precedence over brand accents', async () => {
    for (const brandAccent of brandAccents) {
      // `info` has the lowest precedence within all semantic accents
      // so we need to compare against it
      await testPrecedence(brandAccent, 'info')
    }
  })

  it('has the following precedence: info, positive, warning, danger', async () => {
    await testPrecedence('info', 'positive')
    await testPrecedence('positive', 'warning')
    await testPrecedence('warning', 'danger')
  })

  it('cannot be redefined in context', async () => {
    await injectPage(semanticAccents.map(parent => `
      <div class="stack">
        ${accents.map(child => `
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

    for (const parent of semanticAccents) {
      for (const child of accents) {
        const color = useVar({ accent: parent, emphasis: 'major' })

        const contentInContent = `.${parent}.content .${child}.content`
        await expect(styleOf(contentInContent)).toMatchStyle({ color })

        const contentOnSurface = `.${parent}.surface .${child}.content`
        await expect(styleOf(contentOnSurface)).toMatchStyle({ color })

        const surfaceOnSurface = `.${parent}.surface .${child}.surface`
        await expect(styleOf(surfaceOnSurface)).toMatchStyle({
          color,
          backgroundColor: 'transparent',
        })
      }
    }
  })
})

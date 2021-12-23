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

  it.todo('cannot be redefined in context')
})

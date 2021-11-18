test('page background is the one defined by the theme', async () => {
  await injectPage('<h1>Background</h1>bit more stuff')

  await expect(styleOf(':root')).toMatchStyle({
    backgroundColor: 'var(--theme-background)',
  })
})

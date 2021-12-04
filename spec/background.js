test.only('page background is the one defined by the theme', async () => {
  await injectPage({ screenshot: 'background-default' })
  await expect(styleOf(':root')).toMatchStyle({
    backgroundColor: 'var(--theme-background)',
  })

  // Modifying background to be able clearly see the variable is applied
  await injectPage(`
    <style>
      :root {
        --theme-background: #212121;
        color: #fafafa !important; /* overriding theme to make text readable */
      }
    </style>
  `, { screenshot: 'background-modified' })

  await expect(styleOf(':root')).toMatchStyle({
    backgroundColor: '#212121',
  })
})

import { paramCase } from 'change-case'

const CONTENT = accents.map(accent => `
  <div class="switcher">
    <div class="a box with ${accent} surface">
      ${accent} surface
    </div>
    <div class="a box with ${accent} content">
      ${accent} content
    </div>
  </div>
`).join('\n')

describe('theme', () => {
  it.each(['light', 'dark'])('can be %s', async (scheme) => {
    await injectPage(CONTENT, {
      media: { 'prefers-color-scheme': scheme },
    })
  })

  it('can be controlled by a class', async () => {
    await injectPage(['light', 'dark'].map(scheme => `
      <div class="box & stack with ${scheme} theme">
        <p>${scheme}</p>
        ${CONTENT}
      </div>
    `).join('\n'))
  })
})

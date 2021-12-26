describe('vibrancy', () => {
  it('inverts the current context', async () => {
    await injectPage(`
      <div class="a box & stack with vibrant surface">
        <p>Vibrant</p>

        <div class="a box & stack with vibrant surface">
          <p>Normal</p>

          <div class="a box & stack with vibrant surface">
            <p>Vibrant</p>
          </div>
        </div>
      </div>

      ${[...brandAccents, ...semanticAccents].map(accent => `
        <div class="a box & stack with vibrant ${accent} surface">
          <p>Vibrant</p>

          <div class="a box & stack with vibrant surface">
            <p>Normal</p>

            <div class="a box & stack with vibrant surface">
              <p>Vibrant</p>
            </div>
          </div>
        </div>
      `).join('\n')}
    `)
  })
})

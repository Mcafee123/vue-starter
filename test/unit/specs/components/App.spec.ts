import App from 'components/App'
import { ComponentBuilder } from 'specs/ComponentBuilder'


describe('components/App.ts', () => {
  it('kann erstellt und gemountet werden', () => {
    const testee = new ComponentBuilder<App>(App)
  })
})

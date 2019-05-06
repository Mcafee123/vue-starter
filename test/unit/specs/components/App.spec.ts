import { ComponentBuilder } from 'ComponentBuilder'
import App from 'components/App'


test('components/App.ts kann erstellt und gemountet werden', () => {
  const testee = new ComponentBuilder<App>(App)
})
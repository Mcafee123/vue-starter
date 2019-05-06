import { util } from 'services/util'

test('adds 1 + 2 to equal 3', () => {
  expect(util.CamelPad('vueTemplateCompiler')).toBe('vue-template-compiler')
})
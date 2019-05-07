import { util } from 'services/util'
import { expect } from 'chai'

describe('CamelPad', () => {
  it('un-CamelPad', () => {
    expect(util.CamelPad('vueTemplateCompiler')).to.equal('vue-template-compiler')
  })
})

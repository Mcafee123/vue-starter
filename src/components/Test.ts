import { Component, Vue } from 'vue-property-decorator'
// import WithRender from './Test.html?style=./Test.scss'

// @WithRender
@Component({
  name: 'Test'
})
export default class Test extends Vue {

  public name = 'Test'

}
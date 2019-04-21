import { Component, Vue } from 'vue-property-decorator'
import WithRender from './App.html' // ?style=./HelloWorld.scss'

@WithRender
@Component({
  name: 'HelloWorld'
})
export default class App extends Vue {

  public name = 'Tinu'

}

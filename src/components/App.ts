import { Component, Vue } from 'vue-property-decorator'
import WithRender from './App.html?style=./App.scss'

@WithRender
@Component({
  name: 'App'
})
export default class App extends Vue {

  public name = 'Tinu'

}

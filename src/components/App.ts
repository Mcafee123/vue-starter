import { Component, Vue } from 'vue-property-decorator'
import WithRender from './App.html?style=./App.scss'
import 'style/global.scss'
import Test from 'components/Test'

@WithRender
@Component({
  name: 'App',
  components: {
    Test
  }
})
export default class App extends Vue {

  public name = 'Tinu'

}

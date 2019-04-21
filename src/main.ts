import Vue from 'vue'
import App from 'components/App'

export class C {
    private x = 10
    getX = () => this.x;
    setX = (newVal: number) => { this.x = newVal; }
}

export let x = new C();
export let y = { ...{ some: "value" } }

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
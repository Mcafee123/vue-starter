import Vue from 'vue'
import { util } from 'services/util'

const originalErrorHandler = Vue.config.errorHandler

const tag = (name: string, end?: boolean) => {
  return '<' + (end ? '/' : '') + name + '>'
}

export interface ICallback {
  name: string,
  cb: Vue,
  timeout: number
}

export class ComponentBuilder<T extends Vue> {

  private options: any = {}
  private componentName: string = ''
  private htmlComponentName: string = ''
  private get ComponentName(): string {
    return this.componentName
  }
  private set ComponentName(val: string) {
    this.componentName = val
    this.htmlComponentName = util.CamelPad(val)
  }

  private root: Vue | null = null
  private actionCallbacks: ICallback[] = []
  private expectRenderError: string | null = null
  private provides: Array<{
    symbol: symbol,
    value: any
  }> = []
  private vModel: string = ''

  public get Sut(): T {
    if (!this.root || !this.root.$refs) {
      throw new Error('"root" or "$refs" not available, did you mount the component?')
    }
    return this.root.$refs.component as T
  }

  public get Data(): any {
    return this.options.data as any
  }

  constructor(cmp?: new() => Vue) {
    this.RemoveCustomErrorHandler()
    if (cmp !== undefined) {
      this.WithComp(cmp)
    }
    this.options.data = {}
  }

  public RemoveCustomErrorHandler() {
    Vue.config.errorHandler = originalErrorHandler
    // tslint:disable-next-line:no-console
    console.log('errorHandler entfernt')
  }

  public GetCallback(action: string): ICallback {
    const cbs = this.actionCallbacks.filter(cb => cb.name === action)
    if (cbs.length !== 1) {
      throw new Error('callback not found')
    }
    return cbs[0]
  }

  public WithRef(name: string, wert: any) {
    this.options.$refs = this.options.$refs || {}
    this.options.$refs[name] = wert
    return this
  }

  public WithExpectRenderError(msg: string): ComponentBuilder<T> {
    this.expectRenderError = msg
    return this
  }

  public WithTemplate(template: string): ComponentBuilder<T> {
    this.options.template = template
    return this
  }

  public WithData(name: string, data: any): ComponentBuilder<T> {
    this.options.data[name] = data
    return this
  }

  public With$On(emit: string, handler: () => void) {
    this.options.methods = this.options.methods || {}
    const key = 'handle' + Object.keys(this.options.methods).length
    const name = emit
    this.options.methods[key] = {
      name,
      key,
      handler
    }
  }

  public WithRouterView(): ComponentBuilder<T> {
    Vue.component('router-view', { name: 'router-view', render: h => h('div')})
    return this
  }

  public WithRouterLink(): ComponentBuilder<T> {
    Vue.component('router-link', { name: 'router-link', render: h => h('a')})
    return this
  }

  public WithRouteParam(name: string, val: string): ComponentBuilder<T> {
    const params: any = {}
    params[name] = val
    this.options.components[this.ComponentName].prototype.$route.params = params
    return this
  }

  public WithRouterPushFake(fakePush: (args: any) => void): ComponentBuilder<T> {
    this.options.components[this.ComponentName].prototype.$router.push = fakePush
    return this
  }

  public WithProvides(symbol: symbol, value: any): ComponentBuilder<T> {
    this.provides.push({ symbol, value })
    return this
  }

  public WithBoundProperty(name: string, value: any): ComponentBuilder<T>  {
    this.updateTemplate(' :' + name, name)
    return this.WithData(name, value)
  }

  public WithVModel(obj: any) {
    this.updateTemplate('v-model', 'vModel')
    this.vModel = 'v-model="vModel"'
    return this.WithData('vModel', obj)
  }

  public Mount(): ComponentBuilder<T> {
    if (this.options.template === undefined) {
      if (this.htmlComponentName.length < 1) {
        throw new Error('ComponentBuilder: Kein Template vorhanden (WithTemplate("<div>...") benutzen)')
      } else {
        let props = this.htmlComponentName + ' ref="component"'
        for (const p in this.options.data) {
          if (this.options.data.hasOwnProperty(p)) {
            props += ' :' + p + '="' + p + '"'
          }
        }
        const methods: any = {}
        for (const on in this.options.methods) {
          if (this.options.methods.hasOwnProperty(on)) {
            const e = this.options.methods[on]
            props += ' @' + e.name + '="' + e.key + '"'
            methods[e.key] = e.handler
          }
        }
        this.options.methods = methods
        if (this.vModel !== '') {
          props += ' ' + this.vModel
        }
        const templArr: string[] = []
        templArr.push(tag('div'))
        templArr.push(tag(props))
        templArr.push(tag(this.htmlComponentName, true))
        templArr.push(tag('div', true))
        this.options.template = templArr.join('')
      }
    }
    if (this.options.components === undefined) {
      throw new Error('ComponentBuilder: Kein Template vorhanden ("WithComp({ ComponentName })" benutzen)')
    }

    if (this.options.router) {
      // tslint:disable-next-line: no-console
      console.log('use Router')
      // Vue.use(Router)
    }
    this.root = new Vue(this.options)
    if (this.expectRenderError !== null) {
      // tslint:disable-next-line:no-console
      console.log('expect: ' + this.expectRenderError)
      Vue.config.errorHandler = (err, vm, info) => {
        expect(err).not.toBeNull()
        expect(err.message).not.toBeNull()
        expect(err.message).toBe(this.expectRenderError)
        // tslint:disable-next-line:no-console
        console.log('Fehler "' + err.message + '" abgefangen')
      }
    }
    this.root.$mount()
    return this
  }

  private WithComp(cmp: any): ComponentBuilder<T> {
    if (!this.ComponentName) {
      this.ComponentName = cmp.extendOptions.name
    }
    this.options.components = this.options.components || {}
    this.options.components[this.ComponentName] = cmp
    return this
  }

  private getOrCreateCallback = (name: string) => {
    let cbObj: ICallback
    const cb = this.actionCallbacks.filter(c => c.name === name)
    if (cb.length === 1) {
      cbObj = cb[0]
    } else {
      const vuecallback = new Vue()
      cbObj = { name, cb: vuecallback, timeout: 5 }
      this.actionCallbacks.push(cbObj)
    }
    return cbObj
  }

  private updateTemplate(key: string, value: string) {
    if (this.options.template !== undefined) {
      let index = this.options.template.indexOf('ref="component"')
      if (index === -1) {
        throw new Error('ungültiges Template: es fehlt ref="component"')
      }
      index += 15
      const vorher = this.options.template.substring(0, index)
      const nachher = this.options.template.substring(index)
      const toInsert = key + '="' + value + '"'
      this.options.template = vorher + toInsert + nachher
    }
  }
}

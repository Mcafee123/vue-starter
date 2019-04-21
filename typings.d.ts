declare module '*.html' {
    import Vue, { ComponentOptions, FunctionalComponentOptions } from 'vue'
    interface WithRender {
        <V extends Vue, U extends ComponentOptions<V> | FunctionalComponentOptions>(options: U): U
        <V extends typeof Vue>(component: V): V
    }
    const withRender: WithRender
    export = withRender
}

declare module '*.scss' {
    import Vue, { ComponentOptions } from 'vue'
    interface WithRender {
        <V extends Vue>(options: ComponentOptions<V>): ComponentOptions<V>
        <V extends typeof Vue>(component: V): V
    }
    const withRender: WithRender
    export = withRender
}

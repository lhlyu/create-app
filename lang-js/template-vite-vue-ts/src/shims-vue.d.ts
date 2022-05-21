declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}


interface ImportMetaEnv {

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
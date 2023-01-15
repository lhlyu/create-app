/// <reference types="vite/client" />
// 上面的不能删除

interface ImportMetaEnv {
    readonly VITE_RUN_ENV: string
    readonly VITE_BASE_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

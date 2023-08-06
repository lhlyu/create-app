import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    let base = '/'
    let plugins = [vue()]
    let build: Record<string, any> = {
        target: 'es2015',
        cssTarget: 'chrome61'
    }

    if (mode === 'npm') {
        plugins = [
            vue(),
            cssInjectedByJsPlugin(),
            dts({
                entryRoot: 'src/PROJECT_NAME'
            })
        ]
        build = {
            target: 'es2015',
            cssTarget: 'chrome61',
            copyPublicDir: false,
            lib: {
                entry: 'src/PROJECT_NAME/index.ts',
                formats: ['cjs', 'es', 'umd'],
                name: 'PROJECT_NAME_PASCAL_CASE',
                fileName: 'index'
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue'
                    },
                    exports: 'named'
                }
            }
        }
    }

    return {
        base,
        plugins,
        build
    }
})

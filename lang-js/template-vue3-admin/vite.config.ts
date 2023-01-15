import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import PluginVueJsx from '@vitejs/plugin-vue-jsx'
import VitePluginVueSetupName from 'vite-plugin-vue-setup-name'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, './config')
    return {
        base: env.VITE_BUILD_BASE,
        plugins: [
            vue(),
            PluginVueJsx(),
            VitePluginVueSetupName({
                dirs: ['./src/views'],
                strategy: 'dir'
            })
        ],
        envDir: './config',
        build: {
            target: 'es2015',
            cssTarget: 'chrome61'
        }
    }
})

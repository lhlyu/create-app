import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, './config')
    return {
        base: env.VITE_BUILD_BASE,
        plugins: [
            vue()
        ],
        envDir: './config',
        build: {
            target: 'es2015',
            cssTarget: 'chrome61'
        }
    }
})

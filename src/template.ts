import path from 'node:path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import { handlerFile } from './util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rs = ['index.html', 'package.json', 'README.md', 'LICENSE']

const genViteVue3Ts = async (project: ProjectOption) => {
    const templatePath = path.join(__dirname, 'packages/vite-vue3-ts/**/*')
    console.log(templatePath)
    const filenames = fg.sync(templatePath, {
        dot: true,
        ignore: ['**/node_modules/**']
    })
    filenames.map(src => {
        const dest = src.replace(path.join(__dirname, 'packages/vite-vue3-ts'), `./${project.name}`)
        const has = rs.includes(path.basename(src))
        console.log(dest)
        handlerFile(src, dest, (content: string): string => {
            if (has) {
                content = content.replace('PROJECT_NAME', project.name)
                content = content.replace('PROJECT_DESC', project.desc)
                content = content.replace('PROJECT_VERSION', project.version)
                content = content.replace('PROJECT_AUTHOR', project.author)
            }
            return content
        })
    })
}

export default genViteVue3Ts

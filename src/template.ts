import path from 'node:path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import { handlerFile, toPascalCase } from './util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const templates = [
    {
        name: 'vite-vue3-ts',
        value: 'vite-vue3-ts'
    },
    {
        name: 'vite-vue3-component',
        value: 'vite-vue3-component'
    }
]

const rs = ['index.html', 'package.json', 'README.md', 'LICENSE', 'vite.config.ts', 'COMPONENT_NAME.vue', 'index.ts']

const genProject = async (project: ProjectOption) => {
    const templatePath = path.join(__dirname, `../packages/${project.template}/**/*`)
    const filenames = fg.sync(templatePath, {
        dot: true,
        ignore: [`**/${project.template}/node_modules/**`]
    })
    filenames.map(src => {
        let dest = src.replace(path.join(__dirname, `../packages/${project.template}`), `./${project.name}`)
        // 特殊处理
        if (dest.indexOf('gitignore') > 0) {
            dest = dest.replace('gitignore', '.gitignore')
        }
        if (dest.indexOf('PROJECT_NAME') > 0) {
            dest = dest.replace('PROJECT_NAME', project.name)
        }
        if (dest.indexOf('COMPONENT_NAME') > 0) {
            dest = dest.replace('COMPONENT_NAME', project.component)
        }
        console.log(dest)
        const has = rs.includes(path.basename(src))
        handlerFile(src, dest, (content: string): string => {
            if (has) {
                content = content.replace(/COMPONENT_NAME_PASCAL_CASE/g, toPascalCase(project.component))
                content = content.replace(/COMPONENT_NAME/g, project.component)
                content = content.replace(/PROJECT_NAME_PASCAL_CASE/g, toPascalCase(project.name))
                content = content.replace(/PROJECT_NAME/g, project.name)
                content = content.replace(/PROJECT_DESC/g, project.desc)
                content = content.replace(/PROJECT_VERSION/g, project.version)
                content = content.replace(/PROJECT_AUTHOR/g, project.author)
            }
            return content
        })
    })
}

export default genProject

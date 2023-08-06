import { input, select } from '@inquirer/prompts'
import pkg from '../package.json'
import { getUsername, existsFilename } from './util'
import genProject, { templates } from './template'

const main = async () => {
    console.log(`当前版本号：${pkg.version}`)

    const project: ProjectOption = {
        name: 'app-demo',
        desc: '',
        author: getUsername(),
        version: '0.0.1',
        template: 'vite-vue3-ts',
        component: ''
    }
    project.name = await input({
        message: '项目名字',
        default: project.name,
        validate: value => {
            if (existsFilename(value)) {
                return '已经存在相同的名字的文件或目录'
            }
            if (!/^\w[\w_\-]*$/.test(value)) {
                return '项目仅支持英文、数字、下划线、中划线'
            }
            return true
        }
    })

    project.desc = await input({
        message: '项目描述',
        default: project.desc
    })

    project.author = await input({
        message: '项目作者',
        default: project.author
    })

    project.version = await input({
        message: '项目版本',
        default: project.version
    })

    // 获取模板
    project.template = await select({
        message: '选择一个项目模板',
        choices: templates
    })

    if (project.template === 'vite-vue3-component') {
        project.component = await input({
            message: '组件名字',
            default: project.name
        })
    }

    console.log()
    console.log('-----------------------------')
    console.log()

    // 生成项目
    await genProject(project)

    return project
}

main().then(project => {
    console.log()
    console.log('-----------------------------')
    console.log()
    console.log('创建成功~')
    console.log()
    console.log(`cd ${project.name}`)
    console.log(`pnpm i`)
    console.log()
    console.log('-----------------------------')
})

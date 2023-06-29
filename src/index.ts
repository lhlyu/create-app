import { input } from '@inquirer/prompts'
import pkg from '../package.json'
import { getUsername, existsFilename } from './util'
import genViteVue3Ts from './template'

const main = async () => {
    console.log(`当前版本号：${pkg.version}`)

    const project: ProjectOption = {
        name: 'app-demo',
        desc: '',
        author: getUsername(),
        version: '0.0.1'
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

    // const features = new Set(await checkbox({
    //     message: '选择需要支持的功能',
    //     pageSize: 20,
    //     choices: [
    //         { name: 'vue-router (路由)', value: 'router', checked: true },
    //         { name: 'i18n (国际化)', value: 'i18n', checked: true },
    //         { name: 'pinia (状态管理库)', value: 'pinia', checked: true },
    //         { name: 'pinia-plugin-persistedstate (pinia持久化插件)', value: 'persist', checked: true },
    //         { name: 'zipson (序列化压缩)', value: 'zipson', checked: true },
    //         { name: 'jsx (vue jsx)', value: 'jsx', checked: true },
    //         { name: 'auto-import (自动导入)', value: 'auto', checked: true },
    //         { name: 'sass', value: 'sass', checked: true },
    //         { name: 'prettier (项目代码格式化)', value: 'prettier', checked: true },
    //         { name: 'prettier-plugin-rational-order (CSS属性排序)', value: 'order', checked: true },
    //         { name: 'autoprefixer', value: 'autoprefixer', checked: true },
    //         { name: 'cssnano (CSS优化)', value: 'cssnano', checked: true },
    //         { name: 'vercel', value: 'vercel', checked: true },
    //         { name: 'Dockerfile', value: 'docker', checked: true },
    //     ],
    // }));

    console.log()
    console.log('-----------------------------')
    console.log()

    // 生成项目
    await genViteVue3Ts(project)

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

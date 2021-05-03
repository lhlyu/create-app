#!/usr/bin/env node

const {
    Input,
    Select
} = require('enquirer');
const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const validate = require("validate-npm-package-name")
const gitUserName = require('git-user-name')
const ejs = require('ejs')
const config = require('./config.json')
const pkg = require('./package.json')

const cfg = {
    author : gitUserName(),
    langs : Object.keys(config),
    templates : config
}

const langPrefix = 'lang-'
const templatePrefix = 'template-'

const blackList = ['node_modules','.git','.idea','u.test']

const filterBlackList = name => {
    return blackList.indexOf(name) > -1
}

// 运行
const run = async () => {

    console.log(`当前版本：v${pkg.version}`)
    // 获取项目名
    const namePrompt = await new Input({
        name: 'name',
        message: 'Project Name',
        initial: 'app-demo',
        validate: function(val) {
            // 验证名字是否合法
            const result = validate(val)
            if (result?.errors?.length > 0) {
                return result.errors[0]
            }
            // 验证目录是否已经存在
            let has = false
            if (fsExtra.existsSync(path.join(__dirname,val))) {
                return "the file or directory already exists"
            }
            return true
        }
    }).run()


    // 项目描述
    const descriptionPrompt = await new Input({
        name: 'description',
        message: 'Project Description',
        initial: 'this is demo'
    }).run()

    // 项目版本
    const versionPrompt = await new Input({
        name: 'version',
        message: 'Project Version',
        initial: '0.0.1'
    }).run()

    // 项目作者
    const authorPrompt = await new Input({
        name: 'author',
        message: 'Project Author',
        initial: cfg.author
    }).run()

    // 项目语言
    const langPrompt = await new Select({
        name: 'lang',
        message: 'Choose A Development Language',
        choices: cfg.langs,
        initial: cfg.langs[0],
        skip: cfg.langs.length === 1
    }).run()

    // 项目模板
    const templatePrompt = await new Select({
        name: 'template',
        message: 'Choose A Development Template',
        choices: cfg.templates[langPrompt],
        initial: cfg.templates[langPrompt][0]
    }).run()

    // 项目参数
    const project = {
        PROJECT_NAME: namePrompt,
        PROJECT_DESCRIPTION: descriptionPrompt,
        PROJECT_VERSION: versionPrompt,
        PROJECT_AUTHOR: authorPrompt
    }

    const templatePath = path.join(__dirname,`${langPrefix}${langPrompt}`,`${templatePrefix}${templatePrompt}`)
    const targetPath = path.join(__dirname,namePrompt)

    console.log('templatePath:',templatePath)
    console.log('targetPath:',targetPath)

    walk(templatePath, targetPath, project)
}

// 遍历: 源文件，目标文件，参数
const walk = (srcPath, targetPath, project) => {
    const arr = fs.readdirSync(srcPath);
    arr.forEach(function(item){
        const src = path.join(srcPath, item)
        let target = path.join(targetPath, item)

        const basename = path.basename(src)

        if (filterBlackList(basename)) {
            return
        }
        const stats = fs.statSync(src)
        if(stats.isDirectory()){
            walk(src, target, project)
        }else{
            fsExtra.readFile(src, 'utf8', (err, data) => {
                if (err) throw err
                // 渲染
                data = ejs.render(data, project)
                fsExtra.outputFile(target, data)
            })
        }
    })
}

run()
const fs = require('fs-extra');
const klawSync = require('klaw-sync');
const path = require('path');

const langPrefix = 'lang-'
const templatePrefix = 'template-'

// 需要过滤的目录
const filterFn = item => {
    const basename = path.basename(item.path)
    return basename.indexOf(langPrefix) === 0 || basename.indexOf(templatePrefix) === 0
}

const extract = name => {
    const index = name.indexOf('-')
    return name.substring(index+1)
}

const createIndexDoc = cfg => {
    let tree = `---
order: 1
toc: menu
hero:
  title: 谕の项目模板
  desc: 快速生成自己的一些项目模板
footer: Open-source MIT Licensed | Copyright © 2021<br />Powered by [lhlyu](https://github.com/lhlyu)
---

# 快速入手

## 创建项目

> yarn create @lhlyu/app

- 或

> yarn global add @lhlyu/create-app

> 执行 create-lhlyu-app 或 create-app 或 lca

## 模板列表

<Tree title="按语言划分">
    <ul>`
    for(let lang in cfg) {
        tree += `
        <li>
            ${lang}
            <ul>\n`
        for(let template of cfg[lang]) {
            tree += `                <li>${template}</li>`
        }
        tree += `
            </ul>
        </li>`
    }
    tree += `
    </ul>
</Tree>`
    return tree
}

const run = () => {
    const paths = klawSync('./', { filter: filterFn, depthLimit: 2, nofile: true})

    const cfg = {}
    let cur = ''

    for (let i = 0; i < paths.length; i++) {
        const basename = path.basename(paths[i].path)
        if ( basename.indexOf(langPrefix) === 0 ) {
            const lang = extract(basename)
            if (lang !== cur) {
                cur = lang
            }
            cfg[cur] = []
            continue
        }
        const template = extract(basename)
        cfg[cur].push(template)
    }

    fs.outputJson('./config.json', cfg, { spaces: '\t' },err => {
        if (err) return console.error(err)
        console.log('write config.json success!')
    })

    fs.outputFile('./docs/index.zh-CN.md', createIndexDoc(cfg), err => {
        if (err) return console.error(err)
        console.log('write index.md success!')
    })
}


run()
import os from 'node:os'
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'child_process'

// 获取用户名：git username | os username
export const getUsername = (): string => {
    try {
        return execSync('git config user.name').toString().trim()
    } catch (e) {
        console.error('getUsername:', e)
    }
    return os.userInfo().username
}

// 判断文件名是否存在
export const existsFilename = (fileName: string, includeDir: boolean = true): boolean => {
    if (includeDir) {
        if (fs.existsSync(fileName)) {
            return true
        }
    }
    return fs.existsSync(fileName)
}

// 创建文件
export const createFile = (fileName: string, content: string): boolean => {
    // 文件已经存在
    if (existsFilename(fileName)) {
        return false
    }

    // 目录不存在则创建
    const dir = path.dirname(fileName)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(fileName, content, 'utf-8')
    return true
}

// 文件处理文件
export const handlerFile = async (src: string, dest: string, handler: (content: string) => string): Promise<boolean> => {
    // 文件不存在
    if (!existsFilename(src, false)) {
        return false
    }
    let content = fs.readFileSync(src, 'utf8')
    content = handler(content)
    return createFile(dest, content)
}

// 帕斯卡命名法
export const toPascalCase = (name: string): string => {
    return name
        .split('-')
        .map(item => item[0] && item[0].toUpperCase() + item.substring(1))
        .join('')
}

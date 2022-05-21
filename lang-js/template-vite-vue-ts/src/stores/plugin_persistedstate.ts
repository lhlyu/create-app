import { watch } from "vue"
import { _ActionsTree, _GettersTree, PiniaPluginContext, StateTree } from "pinia"
import LZString from "lz-string"

export interface PersistOptions {
    // 启用
    enabled: true | false
    // 存储方式, 没有则用sessionStorage
    storage?: Storage
    // 存储的名字, 没有则用id
    storeKey?: string
    // 是否启用字符串压缩
    compress?: boolean
}

declare module "pinia" {
    export interface DefineStoreOptions<Id extends string = string, S extends StateTree = StateTree, G = _GettersTree<S>, A = _ActionsTree> {
        persist?: PersistOptions
    }
}

const encode = (v: any, compress: boolean = false): string => {
    try {
        if (!compress) {
            return JSON.stringify(v)
        }
        return LZString.compressToBase64(JSON.stringify(v))
    } catch (e) {
        return ""
    }
    return ""
}

const decode = (s: string, compress: boolean = false): any => {
    try {
        if (!compress) {
            return JSON.parse(s)
        }
        return JSON.parse(LZString.decompressFromBase64(s)!)
    } catch (e) {
        return null
    }
    return null
}

// pinia持久化插件
export default ({ options, store }: PiniaPluginContext): void => {
    if (options.persist?.enabled) {
        // 存储策略
        const storage = options.persist?.storage || sessionStorage
        // 存储的名字
        const storeKey = options.persist?.storeKey || store.$id

        const storageResult = storage.getItem(storeKey)

        if (storageResult) {
            store.$patch(decode(storageResult, options.persist?.compress))
            storage.setItem(storeKey, encode(store.$state, options.persist?.compress))
        }

        watch(
            () => store.$state,
            () => {
                storage.setItem(storeKey, encode(store.$state, options.persist?.compress))
            },
            { deep: true }
        )
    }
}

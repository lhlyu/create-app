import axios from 'axios'

const instance = axios.create({
    baseURL: '',
    timeout: 60000
})

// 拦截请求
instance.interceptors.request.use(config => {
    return config
})

const handlerResponce = () => {
    return {
        code: 1,
        msg: '',
        data: null
    }
}

// 拦截响应
instance.interceptors.response.use(response => {
    if (response.status !== 200 || !response.data) {
        console.error('请求异常: ' + response.status)
        return handlerResponce()
    }
    const result = response.data
    if (result.code < 0) {
        console.error('鉴权失败: ' + result.msg)
        return handlerResponce()
    }
    if (result.code !== 0) {
        console.error('请求错误: ' + result.msg)
    }
    return result
})

export default instance
